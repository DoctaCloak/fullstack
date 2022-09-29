Architecture at a High Level for Recruiters/Developers:

This is just a simple React SPA Hosted on Azure Blob Store. I built a Web API via Azure Functions that communicates with a vendor API for getting Weather Data.

I wasn't sure how in-depth this was expected to be but I should note a few things: as of now getUserContactPreferences is communicating with the Weather API as well as processing the return value based off of their API response.

Typically I would do this with a separate function to have a more stable backend environment and this data would be stored in a database or chained with lambda functions.

The reason you would want to do this is to not have a total failure if the vendor API is down but also be able to monitor the vendor health as well as to keep track of their uptime and mainly keep the cleaning up of the data separate. If there was a vendor failure you would want to know this to help troubleshoot much faster in a war room.

**Note on Proxies:**

I have getUserContactPreferences behind a User Proxy for basic security and monitoring. Right now all routes are supported but technically the only request method that is going to return anything other than a 404 is a GET method.

**High level return for getUserContactPreferences**

```
{
  '2021/10/2': [
    {
      'date': '2021-11-02 21:00:00',
      'preferredContactMethod': 'phone'
    }
  ]
}
```

There is additional meta data returned from the weather api but there was no point in returning it. In regards to the data structure, this was so that we could map a
selected day to a day entry.

The UI Calendar will ONLY allow for business days to be selected and the API will only send back business days. I am assuming with this being an internal feature
we need not return weekends as that would be outside of normal business hours. **Can easily be refactored to support weekends.**

Example call to API: https://christophertaylorfs-web-application.azurewebsites.net/api/users/getUserContactPreferences

## Time Spent

Writing the backend API took me 45 minutes or so. The pain was DevOps. I haven't spent a ton of time on Ops in my career so getting this hosted securely with the proper proxy in place took me maybe 3-4 hours? Now that I know how to do it I reckon I could do so much faster.

Other than the enhancements listed above if we decided not to use Azure Monitoring/AWS Lambda Monitoring then an external Application Monitoring solution could be easily added by replacing my context logs and storing the proper API credentials on the server.

## For Dev

Note on API Credentials: I am using my own token for this not the one given to me. It is safely stored in Azure. If you want to fork this code and work on it yourself you will have to update the application settings either in Azure or Locally in VS Code. See WEATHER_SERVICE_API_TOKEN below.

![image](https://user-images.githubusercontent.com/18430630/139948328-d82554a8-b04f-41a1-b0a5-a4624c433006.png)
