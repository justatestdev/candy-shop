#!/usr/bin/env bash

echo "Starting to deploy 'candy-store', bootstrapping lib..."
cd lib || exit
yarn
yarn build
echo "building web ui..."
cd ../example || exit
yarn
echo "boostrap bundle"
cd ../. || exit
yarn