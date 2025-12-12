//THIS FILE EXPOSES AS AN ACTION CDS
using ActivityOne as my from '../db/schema';

service CatalogService {

  // Expose tables
  entity Books      as projection on my.Books;
  entity Products   as projection on my.Products;
  entity Suppliers  as projection on my.Suppliers;
  entity Categories as projection on my.Categories;

  function northwind() returns String;

  action logBooks(name: String, id: String, title: String, author: String, date: Date) returns String;

  action getBooks(id: String) returns String;
}

