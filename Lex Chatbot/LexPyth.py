import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context): #Main handler
    dynamo = boto3.resource('dynamodb', region_name="us-east-1")
    
   
    if(event["currentIntent"]["name"]=="OrderStatus"):
        orderID=event["currentIntent"]["slots"]["OrderID"]
    # if(event["intentName"]=="OrderStatus"):
        table = dynamo.Table('orders')
       
        responseData = table.query(
            KeyConditionExpression = Key('id').eq(orderID)
        )
       
        message=responseData['Items'][0]['status']
        print(responseData['Items'][0]['status'])
        return {
        "dialogAction": {
             "type": "Close",
             "fulfillmentState": "Fulfilled",
             "message": {
                   "contentType": "PlainText",
                   "content": "Your order of "+responseData['Items'][0]['items']+" is currently "+responseData['Items'][0]['status']
                },
            }
            
        }
      
    elif(event["currentIntent"]["name"]=="RegisterComplaint"):  #If the user wants to register a complaint.
        table = dynamo.Table('orders')
        ordid=event["currentIntent"]["slots"]["OrderID"]
        issue=event["currentIntent"]["slots"]["Issue"]
        print(event["currentIntent"]["slots"]["OrderID"])
        table = dynamo.Table('Complaints')
        result=table.put_item(
        Item={
            'Id': ordid,
            'issue': issue,
            'status':"Forwarded for review"
            
        }
        )
        return  {
        "dialogAction": {
             "type": "Close",
             "fulfillmentState": "Fulfilled",
             "message": {
                   "contentType": "PlainText",
                   "content": "Your complaint number is "+ordid+" and the issue is "+issue
                },
            }
        }
        
    elif(event["currentIntent"]["name"]=="ComplaintStatus"):  #Method displays the status pf complaint, if the user wants to talk to manager the link is also attached
        orderID=event["currentIntent"]["slots"]["OrderID"]
        table = dynamo.Table('Complaints')
        responseData = table.query(
            KeyConditionExpression = Key('Id').eq(orderID)
        )
        print(responseData)
        return  {
        "dialogAction": {
             "type": "Close",
             "fulfillmentState": "Fulfilled",
             "message": {
                   "contentType": "PlainText",
                   "content": "The issue of your complaint is "+responseData['Items'][0]['issue']+" and status is "+responseData['Items'][0]['status']+" visit the link to chat with a represnetative "
                },
            }
        }
        
    elif(event["currentIntent"]["name"]=="OrderFood"):  #method displays the available restraunts in the application from DynamoDB
        table= dynamo.Table('restaurantData')
        restraunts=table.scan()
        lofres=''
        for r in restraunts['Items']:
            lofres=lofres+r['name']+", "
        return  {
        "dialogAction": {
             "type": "Close",
             "fulfillmentState": "Fulfilled",
             "message": {
                   "contentType": "PlainText",
                   "content": "The Restraunts we have online are "+lofres
                },
            }
        }
        
        
