define([
  'ojs/ojcore',
  'knockout',
  'ojs/ojarraydataprovider',
  'context',
  'ojs/ojtable',
  'ojs/ojformlayout',
  'ojs/ojinputtext',
  'ojs/ojselectsingle',
  'ojs/ojbutton'
],
function (oj, ko, ArrayDataProvider, context) {

  function TransactionsViewModel() {
    var self = this;
    var BASE_URL = 'http://localhost:8080/transactions';

    // TRANSACTIONS
    self.transactions = ko.observableArray([]);

    // DATA PROVIDER
    self.dataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: 'transactionId'
      })
    );

    // TABLE COLUMNS
    self.columns = [
      { headerText: 'ID', field: 'transactionId' },
      { headerText: 'Account ID', field: 'accountId' },
      { headerText: 'Amount', field: 'amount' },
      { headerText: 'Type', field: 'type' },
      { headerText: 'Date', field: 'transactionDate' }
    ];

    // FORM FIELDS
    self.accountId = ko.observable(
      context.selectedAccountId
        ? context.selectedAccountId()
        : null
    );

    self.amount = ko.observable('');

    // TRANSACTION TYPE OPTIONS
    self.typeOptions = new ArrayDataProvider(
      [
        { value: 'CREDIT', label: 'CREDIT' },
        { value: 'DEBIT', label: 'DEBIT' }
      ],
      {
        keyAttributes: 'value'
      }
    );

    self.type = ko.observable('CREDIT');

    // LOAD TRANSACTIONS
    self.loadTransactions = function () {
      fetch(BASE_URL)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log('Transactions fetched:', data.length);
          console.log('Transaction data:', data);

          self.transactions(data);

          self.dataProvider(
            new ArrayDataProvider(data, {
              keyAttributes: 'transactionId'
            })
          );
        })
        .catch(function (err) {
          console.error('Error loading transactions:', err);
        });
    };

    // CREATE TRANSACTION
    self.createTransaction = function () {
      if (
        !self.accountId() ||
        !self.amount() ||
        !self.type()
      ) {
        console.warn(
          'Form incomplete — Account ID, Amount and Type are required.'
        );
        return;
      }

      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountId: Number(self.accountId()),
          amount: Number(self.amount()),
          type: self.type()
        })
      })
        .then(function (res) {
          if (!res.ok) {
            return res.text()
              .then(function (msg) {
                throw new Error(
                  'Server responded ' +
                  res.status +
                  ': ' +
                  msg
                );
              });
          }

          return res.json();
        })
        .then(function () {
          console.log('Transaction created successfully');

          self.amount('');
          self.loadTransactions();
        })
        .catch(function (err) {
          console.error('Error creating transaction:', err);
        });
    };

    // INITIAL LOAD
    self.loadTransactions();
  }

  return TransactionsViewModel;
});