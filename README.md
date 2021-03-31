# [Minesweeper](https://minesweeper-stevensmacbook.netlify.app/)

## Assignment Overview:

For this assignment, the goal was to communicate with a back-end API server to create the user-interface for a [Minesweeper][1] clone.

[1]: https://en.wikipedia.org/wiki/Minesweeper_(video_game)

## Objectives

- Understand how state drives changes to an interface in React
- Respond to user events in React
- Understand and use REST APIs
- Use React lifecycle methods
- Understand and interpret API documentation
- Use `fetch` or `axios` to perform `POST` request or

## Requirements

Documentation for the API used:

`https://minesweeper-api.herokuapp.com/`

Interpret the response and render a graphical user interface. The API results include an array of arrays (two-dimensional array). These represent _rows_ and _columns_. Consider using `flexbox`, `grid`, or an old-fashioned `table` to organize these.

## Additional Resources

- [React Mouse Events](https://reactjs.org/docs/events.html#mouse-events)
- [JavaScript Fetch API Quick Reference](https://handbook.suncoast.io/lessons/misc-quick-reference/js-fetch)
- [AXIOS a better "fetch" for JavaScript](https://handbook.suncoast.io/lessons/misc-quick-reference/axios)
- [Article on using two-dimensional-arrays in React](https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react)

### Explorer Mode

- Create a button to create a new game. Use the animated gif above as a user interface guide. Do at least that much, but also feel free to have fun.
- Style the cells appropriately.
- Left-clicking a cell performs the `check` action
- Right/secondary clicking a cell performs the `flag` action
- When the game status changed to `won` or `lost` a victory or failure message - Do not use `alert` for this. Update the user interface.

### Adventure Mode

- Before creating the game, allow the user to choose: _Easy_, _Medium_, or _Hard_ mode.
- Have fun with the styling. Make it your own.
