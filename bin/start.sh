#!/bin/sh
ENV["NODE_ENV"] ||= "development"

if [ ENV["NODE_ENV"] == "production" ] ; then
  yarn start
else
  yarn dev
fi