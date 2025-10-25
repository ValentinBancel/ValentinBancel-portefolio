#!/bin/bash
urls=(
  "https://www.valentin-bancel.com/"
  "https://www.valentin-bancel.com/achievement"
  "https://www.valentin-bancel.com/project"
  "https://www.valentin-bancel.com/cv"
  # "https://www.valentin-bancel.com/"
  # "https://www.valentin-bancel.com/"
)

for url in "${urls[@]}"
do
  name=$(echo $url | sed 's/https\?:\/\///' | sed 's/[^a-zA-Z0-9]/_/g')
  lighthouse "$url" --output html --output-path "./rapport/$name.html" --quiet --chrome-flags="--headless"
done

