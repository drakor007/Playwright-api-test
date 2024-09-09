A small scenario for demonstrate API testing on the https://airportgap.com/docs#api_ref_get_favorites playground :)

You can use npm script "Run-In-Chrome" for run it.
Scenario:
1. Read all the Airports and saved the first two ids
2. Successively saveing the first and the second to Favorites (suddenly I couldn't do it, enpoint didn't allow it)
3. Load Favorites and verify that it contains the first and second Airport
4. Delete Favorites
5. Verify that it is really deleted

   All calls have checks of response codes an validation if it neccessary
