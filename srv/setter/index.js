//THIS FILE IS TO INSERT DATA INTO TABLES
const cdsCompile = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const SELECT = require('@sap/cds/lib/ql/SELECT');
const { v4: uuidv4 } = require('uuid');

async function LogBooks(borrowerName, borrowerID, bookTitle, authorName, readDate) {
    const txInsert = await cds.transaction();

    //Check duplicates
    const duplicate = await txInsert.run(
        SELECT.one.from('ACTIVITYONE_BOOKS').where(
            { borrowerName: borrowerName,
              bookTitle,
              readDate  })
    );

    if (duplicate) {
        return 'Duplicate found!'
    }

    await txInsert.begin();
    //await txInsert.run(INSERT.into('ACTIVITYONE_BOOKS').entries({
    await txInsert.run(INSERT.into('ACTIVITYONE_BOOKS').entries({
        ID: uuidv4(),
        borrowerName: borrowerName,
        borrowerID: borrowerID,
        bookTitle: bookTitle,
        authorName: authorName,
        readDate: readDate
    }));
    await txInsert.commit();
    
    return 'Successfully Inserted';

};

module.exports = {
    LogBooks
};