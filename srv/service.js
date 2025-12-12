//THIS FILE EXPOSES CREATED FUNCTIONS AS A SERVICE
const cds = require('@sap/cds');
const { LogBooks } = require('../srv/setter/index');

module.exports = async srv => {
    //Before inserting a Book
    srv.before('CREATE', 'Books', req => {
    });

    //Log before Updating
    srv.before('UPDATE', 'Books', req => {
        console.log(`Updating Book record for ID: ${req.data.borrowerID}`)
    });

    //Log before Deleting
    srv.before('DELETE', 'Books', req => {
        console.log(`Deleting Book record for ID: ${req.data.borrowerID}`)
    });

    srv.on('northwind', async (req) => {
        try {
            const response = await executeHttpRequest(
                {
                    destinationName: "northwind",
                },
                {
                    method: "GET",
                    url: "/V3/Northwind/Northwind.svc/Products?$format=json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            return response.data;
        } catch (error) {
            return { 'MESSAGE': error.message || error.toString() };
        }
    });

    srv.on('logBooks', async (req) => {
        const { borrowerName, borrowerID, bookTitle, authorName, readDate } = req.data;
        const result = await LogBooks();
        return result; //Return a string
    });
};