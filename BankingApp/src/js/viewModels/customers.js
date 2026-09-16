define([
'ojs/ojcore',
'knockout',
'ojs/ojmutablearraydataprovider',
'appController',
'context',
'ojs/ojtable',
'ojs/ojformlayout',
'ojs/ojinputtext',
'ojs/ojbutton'
],

function (oj, ko, MutableArrayDataProvider, app, context) {

function CustomersViewModel() {

    var self = this;

    var BASE_URL = 'http://localhost:8080/customers';

    // CUSTOMER DATA
    self.customers = ko.observableArray([]);


    self.dataProvider = new MutableArrayDataProvider([], {
        keyAttributes: 'customerId'
    });


    self.columns = [
        { headerText: 'ID', field: 'customerId' },
        { headerText: 'Name', field: 'name' },
        { headerText: 'Email', field: 'email' }
    ];


    // FORM FIELDS
   
    self.name = ko.observable('');
    self.email = ko.observable('');

    // SUCCESS MESSAGE
   
    self.successMessage = ko.observable('');
    self.showCreateAccount = ko.observable(false);

  // LOAD ALL CUSTOMERS
 
    self.loadCustomers = function () {
        fetch(BASE_URL)

            .then(function (res) {
                return res.json();
            })
            .then(function (data) {

                console.log('Fetched count:', data.length);
                console.log('Fetched data:', data);
                self.customers(data); // Put the fetched customer array into the Knockout observable array.
                self.dataProvider.data = data; //give the fetched customer records to the OJET DataProvider so that oj-table can display them.
            })

            .catch(function (err) {
                console.error('Error loading customers:', err);
            });
    };
   // CREATE CUSTOMER

    self.createCustomer = function () {
        // Validate form
        if (!self.name() || !self.email()) {
            console.warn( 'Form incomplete — Name and Email are required.'  );
            return;
        }
        // Keep name before clearing the form
        var customerName = self.name();


        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: self.name(),
                email: self.email()
            })
        })
      // FIRST: CONVERT RESPONSE TO JSON

        .then(function (res) {
            if (!res.ok) {
                throw new Error( 'Customer creation failed. HTTP Status: ' +  res.status );
            }
            return res.json();
        })

         // SECOND: GET CUSTOMER ID FROM JSON RESPONSE
    
        .then(function (data) {
            console.log('Created customer response:', data);
            var customerId = data.customerId;

            if (!customerId) {
                console.error(  'Customer ID was not returned by backend.'  );
                return;
            }
              // STORE CUSTOMER ID IN SESSION
    
            sessionStorage.setItem(   'customerId',  customerId  );
          // OPTIONAL: ALSO STORE IN OJET CONTEXT
            context.selectedCustomerId(customerId);

              // SHOW SUCCESS MESSAGE
     
            self.successMessage(    'Hey ' +  customerName +   ', you are registered with Customer ID: ' +  customerId   );

       // SHOW CREATE ACCOUNT BUTTON
    
            self.showCreateAccount(true);
            // CLEAR FORM
  
            self.name('');
            self.email('');
           // REFRESH ALL CUSTOMERS TABLE
             self.loadCustomers();
        })

        .catch(function (err) {
            console.error(                'Error creating customer:',                err            );
        });
    };

    // GO TO CREATE ACCOUNT PAGE
 
self.goToCreateAccount = function () {
    var customerId =        sessionStorage.getItem('customerId');
    console.log(  'Navigating to account page for customer:',  customerId  );
    app.navigateTo('accounts');
};
    // EXISTING ROW SELECTION FUNCTION
     self.approveCustomer = function (customerRow) {
        context.selectedCustomerId(
            customerRow.customerId
        );
        app.getSelectedItem()('accounts');
    };
    // INITIAL LOAD
     self.loadCustomers();
}

return CustomersViewModel;

});
