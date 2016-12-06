#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' https://jhw5.herokuapp.com/
echo ""
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' https://jhw5.herokuapp.com/articles
echo ""
echo ""

echo "POST /article"
curl -H 'Content-Type: application/json' https://jhw5.herokuapp.com/article -d "{ \"text\":\"This is my new article! $(date)\" }"
echo ""
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' https://jhw5.herokuapp.com/articles
echo ""
echo ""
