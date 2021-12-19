import json
import boto3

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb')
    
    restaurantData = dynamo.Table('restaurantData')
    responseRestaurantData = restaurantData.scan()
    processdata = []
    
    # for i in range(0,len(responseRestaurantData['Items'])):
    #     restaurant = responseRestaurantData['Items'][i]["name"]
    #     processdata.append(restaurant)

    
    return responseRestaurantData['Items']
