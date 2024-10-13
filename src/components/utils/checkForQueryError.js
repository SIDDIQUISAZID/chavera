// checks the response.json() for query errors, returns true if error, returns false if no error
const checkForQueryError = (json) => {
    return (json && json.queryResult && json.queryResult.hasQueryError);
}

export { checkForQueryError };