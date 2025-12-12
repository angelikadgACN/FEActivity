//THIS FILE EXPOSES CREATED FUNCTIONS AS A SERVICE
const cds = require('@sap/cds');
const { LogBooks } = require('../srv/setter/index');
const { FetchBooks } = require('../srv/getter/index');

module.exports = async srv => {
    //Before inserting a Book
    srv.before('CREATE', 'Books', req => {
        console.log(`Inserting Book record`)
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
        const { name, id, title, author, date } = req.data;
        const result = await LogBooks(name, id, title, author, date);
        return result; //Return a string
    });

    srv.on('getBooks', async (req) => {
        const { id } = req.data;
        const result = await FetchBooks(id);
        return result;
    });
};