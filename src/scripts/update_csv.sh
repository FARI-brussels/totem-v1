#!/bin/bash

CSV_FILE="./survey.csv"

# Check if the file exists
if [ ! -f "$CSV_FILE" ]; then
    # Create the file and add a header
    echo "survey_name,rating,feedback" > "$CSV_FILE"
fi

# Read input from arguments
SURVEY_NAME=$1
RATING=$2
FEEDBACK=$3
  
# Append the new data
echo "$SURVEY_NAME,$RATING,\"$FEEDBACK\"" >> "$CSV_FILE"
