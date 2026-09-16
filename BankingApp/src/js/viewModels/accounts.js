define([
  'ojs/ojcore',
  'knockout',
  'ojs/ojarraydataprovider',
  'context',
  'appController',
  'ojs/ojtable',
  'ojs/ojformlayout',
  'ojs/ojinputtext',
  'ojs/ojbutton'
],
function (oj, ko, ArrayDataProvider, context, app) {
  function AccountsViewModel() {
    
    var self = this;
    var BASE_URL = 'http://localhost:8080/accounts';

    // DATA
    self.accounts = ko.observableArray([]);
    self.dataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: 'accountId'
      })
    );

    // COLUMNS
    self.columns = [
      { headerText: 'Account ID', field: 'accountId' },
      { headerText: 'Customer ID', field: 'customerId' },
      { headerText: 'Balance', field: 'balance' }
    ];

    // FORM
    self.customerId = ko.observable(context.selectedCustomerId());
    self.balance = ko.observable('');

    // SUCCESS MESSAGE
    self.successMessage = ko.observable('');
    self.showCreateTransaction = ko.observable(false);

    // LOAD ACCOUNTS
    self.loadAccounts = function () {
      console.log('Calling:', BASE_URL);

      fetch(BASE_URL)
        .then(function (res) {
          console.log('HTTP status:', res.status);
          return res.json();
        })
        .then(function (data) {
          console.log('Accounts API response:', data);
          console.log('Number of accounts:', data.length);

          // Store records
          self.accounts(data);

          // Update DataProvider
          self.dataProvider(
            new ArrayDataProvider(data, {
              keyAttributes: 'accountId'
            })
          );
        })
        .catch(function (err) {
          console.error('Accounts error:', err);
        });
    };

    // CREATE ACCOUNT
    self.createAccount = function () {
      if (!self.customerId() || !self.balance()) {
        console.warn('Customer ID and Balance are required');
        return;
      }

      // Keep customer ID before clearing anything
      var customerId = self.customerId();

      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: Number(self.customerId()),
          balance: Number(self.balance())
        })
      })

      // Convert HTTP response to JSON
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Server responded: ' + res.status);
        }
        return res.json();
      })

      // Account created
      .then(function (data) {
        console.log('Account created:', data);

        // Get generated Account ID
        var accountId = data.accountId;
        if (!accountId) {
          console.error('Account ID was not returned by backend.');
          return;
        }

        // Store Account ID in sessionStorage
        sessionStorage.setItem('accountId', accountId);

        // Also store in OJET context
        context.selectedAccountId(accountId);

        // Show success message
        self.successMessage(
          'Account created successfully for Customer ID: ' +
          customerId +
          '. Your Account ID is: ' +
          accountId
        );

        // Show Create Transaction button
        self.showCreateTransaction(true);

        // Clear balance
        self.balance('');

        // Refresh accounts table
        self.loadAccounts();
      })
      .catch(function (err) {
        console.error('Create account error:', err);
      });
    };

    // GO TO TRANSACTION PAGE
    self.goToTransaction = function () {
      var accountId = sessionStorage.getItem('accountId');
      console.log('Navigating to transaction page for Account ID:', accountId);

      // Use your application's existing navigation
      app.navigateTo('transactions');
    };

    // INITIAL LOAD
    self.loadAccounts();
  }

  return AccountsViewModel;
});
