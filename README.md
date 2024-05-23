# Mercury UI

The first step to get this running is to install the dependencies specified in `package.json`. You may do so by executing `npm install` in a shell. You may also be able to use Yarn.

At this point, you should ideally have set up the [Mercury Backend](https://github.com/mikeogezi/mercury-backend). If that is running on a remote server, you should set up ngrok like I've described [here](https://github.com/mikeogezi/mercury-backend/blob/master/README.md) and set the link provided in the `HOST` constant in [`src/App.js`](/src/App.js). If not, just set the `HOST` constant in [`src/App.js`](/src/App.js) to the url that [Mercury Backend](https://github.com/mikeogezi/mercury-backend) is running on.