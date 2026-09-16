define([
  'ojs/ojcore',
  'knockout',
  'ojs/ojarraydataprovider',
  'appController',
  'context',
  'ojs/ojformlayout',
  'ojs/ojinputtext',
  'ojs/ojbutton',
  'ojs/ojselectsingle',
  'ojs/ojtable'
],
function (oj, ko, ArrayDataProvider, app, context) {

  function TransactionDashboardViewModel() {
    var self = this;
    var BASE_URL = 'http://localhost:8080/transactions';

    // SEARCH BY TRANSACTION ID
    self.transactionId = ko.observable('');

    // SEARCH BY TRANSACTION TYPE
    self.transactionType = ko.observable('');

    self.transactionTypes = [
      { value: 'CREDIT', label: 'CREDIT' },
      { value: 'DEBIT', label: 'DEBIT' }
    ];

    self.transactionTypeDP = new ArrayDataProvider(
      self.transactionTypes,
      {
        keyAttributes: 'value'
      }
    );

    // SINGLE TRANSACTION RESULT
    self.resultTransactionId = ko.observable('');
    self.resultAccountId = ko.observable('');
    self.resultAmount = ko.observable('');
    self.resultType = ko.observable('');
    self.resultDate = ko.observable('');

    // MULTIPLE TRANSACTION RESULT
    self.transactions = ko.observableArray([]);

    // TABLE DATA PROVIDER
    self.transactionDataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: 'transactionId'
      })
    );

    // TABLE COLUMNS
    self.transactionColumns = [
      { headerText: 'Transaction ID', field: 'transactionId' },
      { headerText: 'Account ID', field: 'accountId' },
      { headerText: 'Amount', field: 'amount' },
      { headerText: 'Transaction Type', field: 'type' },
      { headerText: 'Transaction Date', field: 'transactionDate' }
    ];

    // VISIBILITY
    self.showResult = ko.observable(false);
    self.showTypeResults = ko.observable(false);

    // MESSAGE
    self.message = ko.observable('');

    // SEARCH BY TRANSACTION ID
    self.searchTransaction = function () {
      var id = self.transactionId();

      if (!id) {
        self.message('Please enter a Transaction ID.');
        self.showResult(false);
        self.showTypeResults(false);
        return;
      }

      console.log('Searching transaction:', id);

      // Clear previous results
      self.showTypeResults(false);
      self.transactions([]);

      self.transactionDataProvider(
        new ArrayDataProvider([], {
          keyAttributes: 'transactionId'
        })
      );

      self.message('');
      self.showResult(false);

      // CALL BACKEND
      fetch(BASE_URL + '/' + encodeURIComponent(id))
        .then(function (res) {
          console.log('Transaction HTTP status:', res.status);

          if (!res.ok) {
            if (res.status === 404) {
              throw new Error(
                'Transaction ID ' + id + ' was not found.'
              );
            }

            throw new Error(
              'Server responded with status: ' + res.status
            );
          }

          return res.json();
        })
        .then(function (data) {
          console.log('Transaction found:', data);

          // STORE SINGLE TRANSACTION DATA
          self.resultTransactionId(data.transactionId);
          self.resultAccountId(data.accountId);
          self.resultAmount(data.amount);
          self.resultType(data.type);
          self.resultDate(data.transactionDate);

          // SHOW RESULT
          self.showResult(true);
          self.showTypeResults(false);
          self.message('Transaction found successfully.');
        })
        .catch(function (err) {
          console.error('Transaction search error:', err);

          self.showResult(false);
          self.message(
            err.message || 'Unable to find transaction.'
          );
        });
    };

    // SEARCH BY TRANSACTION TYPE
    self.searchByType = function () {
      var type = self.transactionType();

      if (!type) {
        self.message('Please select CREDIT or DEBIT.');
        self.transactions([]);

        self.transactionDataProvider(
          new ArrayDataProvider([], {
            keyAttributes: 'transactionId'
          })
        );

        self.showTypeResults(false);
        return;
      }

      console.log('Searching transactions by type:', type);

      // Clear single result
      self.showResult(false);
      self.message('');
      self.showTypeResults(false);

      // CREATE URL
      var url =
        BASE_URL +
        '/type/' +
        encodeURIComponent(type);

      console.log('Calling URL:', url);

      // CALL BACKEND
      fetch(url)
        .then(function (res) {
          console.log(
            'Transaction Type HTTP status:',
            res.status
          );

          if (!res.ok) {
            throw new Error(
              'Server responded with status: ' + res.status
            );
          }

          return res.json();
        })
        .then(function (data) {
          console.log('TYPE RESPONSE:', data);
          console.log('TYPE RESPONSE COUNT:', data.length);

          // STORE DATA
          self.transactions(data);

          // CREATE ARRAY DATA PROVIDER
          self.transactionDataProvider(
            new ArrayDataProvider(data, {
              keyAttributes: 'transactionId'
            })
          );

          // SHOW TABLE
          self.showTypeResults(true);
          self.showResult(false);

          self.message(
            data.length +
            ' ' +
            type +
            ' transaction(s) found.'
          );
        })
        .catch(function (err) {
          console.error(
            'Transaction type search error:',
            err
          );

          self.transactions([]);

          self.transactionDataProvider(
            new ArrayDataProvider([], {
              keyAttributes: 'transactionId'
            })
          );

          self.showTypeResults(false);

          self.message(
            err.message || 'Unable to find transactions.'
          );
        });
    };

    // CLEAR SEARCH
    self.clearSearch = function () {
      self.transactionId('');
      self.transactionType('');

      // Clear single result
      self.resultTransactionId('');
      self.resultAccountId('');
      self.resultAmount('');
      self.resultType('');
      self.resultDate('');

      // Clear multiple result
      self.transactions([]);

      self.transactionDataProvider(
        new ArrayDataProvider([], {
          keyAttributes: 'transactionId'
        })
      );

      // Clear message
      self.message('');

      // Hide results
      self.showResult(false);
      self.showTypeResults(false);
    };

    // GET TRANSACTION ID FROM SESSION
    var storedTransactionId =
      sessionStorage.getItem('transactionId');

    if (storedTransactionId) {
      self.transactionId(storedTransactionId);
    }
  }

  return TransactionDashboardViewModel;
});