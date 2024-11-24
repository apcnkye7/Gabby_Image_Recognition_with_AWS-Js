import json
import boto3
import uuid
from datetime import datetime

# Initialize Rekognition, S3, and DynamoDB clients
rekognition_client = boto3.client('rekognition')
s3_client = boto3.client('s3')  
dynamodb_client = boto3.client('dynamodb')

# Define the DynamoDB table name
DYNAMODB_TABLE = 'CelebrityImageMetdata'

def lambda_handler(event, context):
    # Get bucket and image key from the event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    image_key = event['Records'][0]['s3']['object']['key']
    image_url = f"s3://{bucket_name}/{image_key}"
    
    # Call Rekognition to recognize celebrities
    try:
        response = rekognition_client.recognize_celebrities(
            Image={'S3Object': {'Bucket': bucket_name, 'Name': image_key}}
        )
        
        # Extract celebrity details
        celebrities = response.get('CelebrityFaces', [])
        results = []
        
        for celebrity in celebrities:
            celebrity_info = {
                'Name': celebrity['Name'],
                'Confidence': celebrity['Face']['Confidence'],
                'BoundingBox': celebrity['Face']['BoundingBox']
            }
            results.append(celebrity_info)
        
        # Store results in S3
        result_key = f"results/{image_key.split('/')[-1].replace('.jpeg', '')}_celebrities.json"
        s3_client.put_object(
            Bucket=bucket_name,
            Key=result_key,
            Body=json.dumps(results)
        )
        
        # Write data to DynamoDB
        for celeb in results:
            # Prepare the item with a Timestamp
            item = {
                'ImageKey': {'S': image_key},  # Image key
                'name': {'S': image_key},  # Image name
                'url': {'S': image_url},  # S3 URL of the image
                'description': {'S': f"Image containing {celeb['Name']}"},  # Description
                'createdAt': {'S': datetime.utcnow().isoformat()},  # Timestamp
                'celebrityName': {'S': celeb['Name']},  # Celebrity name
                'confidence': {'N': str(celeb['Confidence'])},  # Confidence score
                'Timestamp': {'S': str(int(datetime.utcnow().timestamp()))}  # Add Timestamp field
            }

            # Insert into DynamoDB
            dynamodb_client.put_item(
                TableName=DYNAMODB_TABLE,
                Item=item
            )
        
        # Print or log results
        print("Celebrity Recognition Results:", json.dumps(results, indent=2))
        
        return {
            'statusCode': 200,
            'body': json.dumps(f"Processed image {image_key}, found {len(celebrities)} celebrities.")
        }
    
    except Exception as e:
        print(f"Error processing image {image_key}: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error processing image {image_key}: {str(e)}")
        }
