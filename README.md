# kaholo-plugin-appoptics
Kaholo integration with SolarWinds AppOptics API.

## Settings:
1. API Token (Vault) **Optional** - Default API token to use for authentication.

## Method: Get Alert
Retrieves info about the specified alert.

### Parameters:
1. API Token (Vault) **Optional** - API token to use for authentication. Required if default API token was not provided.
2. Alert ID/Name (String) **Required** - The Name or ID of the Alert to get.

## Method: Create Alert
Create a new alert(**Not an alert status(triggered/ok)**).
### Parameters:
1. API Token (Vault) **Optional** - API token to use for authentication. Required if default API token was not provided.
2. Alert Name (String) **Required** - The Name of the Alert to create.
3. Description (Text) **Optional** - Description of the alert.
4. Conditions (Array of objects) **Required** - **Must Provide From Code** - An array of [alert conditions](https://docs.appoptics.com/api/#alert-conditions) provided as objects. Must Provide at least one item inside the array.
5. Services (Text/Array) **Required** - The IDs of the services to send this alert on. Can be provided either as text or as an array from code. To enter multiple values seperate each with a new line.
6. Attributes (Text/Object) **Optional** - The attributes to assign to this alert. Can be provided either as text or as an object. If provided as text must be in the format of key=value. To Enter mutliple values seperate each with a new line. If provided as an Object from code, each of the object's fields represent an attribute.
7. Active (Boolean) **Optional** - Identifies whether the alert is active (can be triggered). Defaults to true.
8. Rearm Minutes (Integer) **Optional** - Specifies the minimum amount of time between sending alert notifications, in minutes. A notification will be sent once the alert is triggered, and then will not be sent again until the rearm timer has elapsed, even if more measurements are received that would trigger the alert. Default is 10.

## Method: List Services
Retrieves info about all services.

### Parameters:
1. API Token (Vault) **Optional** - API token to use for authentication. Required if default API token was not provided.
