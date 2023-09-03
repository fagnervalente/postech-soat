#!/bin/bash
for i in {1..10000}; do
  curl http://127.0.0.1:31000/order
  sleep $1
done