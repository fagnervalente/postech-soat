#!/bin/bash
for i in {1..10000}; do
  curl localhost:31000/order
  sleep $1
done