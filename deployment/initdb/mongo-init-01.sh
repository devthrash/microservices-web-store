#!/bin/bash

mongosh <<EOF
db = db.getSiblingDB('products_db');
db.createUser({
  user: 'products_db_user',
  pwd: 'ps',
  roles: [{
    role: 'readWrite',
    db: 'products_db'
  }]
})

db = db.getSiblingDB('customers_db');
db.createUser({
  user: 'customers_db_user',
  pwd: 'ps',
  roles: [{
    role: 'readWrite',
    db: 'customers_db'
  }]
})

db = db.getSiblingDB('users_db');
db.createUser({
  user: 'users_db_user',
  pwd: 'ps',
  roles: [{
    role: 'readWrite',
    db: 'users_db'
  }]
})

db = db.getSiblingDB('orders_db');
db.createUser({
  user: 'orders_db_user',
  pwd: 'ps',
  roles: [{
    role: 'readWrite',
    db: 'orders_db'
  }]
})
EOF
