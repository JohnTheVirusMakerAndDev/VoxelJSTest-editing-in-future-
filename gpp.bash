#!/bin/bash

DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
GPP="$DIR/../GenRect/gpp"

$GPP -n -o "$DIR/assets/libPhysics.js" "$DIR/assets/libPhysics.debug.js"