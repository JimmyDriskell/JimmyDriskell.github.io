import json
import random

def randomize_response_value(question_group):
    if question_group == 1:
        return random.choice([0, 1, 2, 3, 4, 5])
    elif question_group == 2:
        return random.choice([0, 1, 2, 3, 4, 5, 6])
    elif question_group == 3:
        return random.choice([0, 1, 2, 3, 4])
    elif question_group == 4:
        return random.choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    elif question_group == 5:
        return random.choice([0, 1, 2, 3, 4])
    elif question_group == 6:
        return random.choice([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    else:
        raise ValueError("Invalid question group")

def modify_survey(json_data, new_survey_id, new_user_id):
    for entry in json_data[0]: 
        entry['survey_id'] = new_survey_id
        entry['user_id'] = new_user_id
        entry['response_value'] = randomize_response_value(entry['question_group'])
    return json.dumps(json_data, ensure_ascii=False, indent=4)

# Example JSON data
json_data = [
    [
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 4,
        "response_value": 4,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 5,
        "response_value": 3,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 6,
        "response_value": 4,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 7,
        "response_value": 5,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 8,
        "response_value": 4,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 9,
        "response_value": 5,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 10,
        "response_value": 4,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 11,
        "response_value": 3,
        "question_group": 1
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 12,
        "response_value": 5,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 13,
        "response_value": 4,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 14,
        "response_value": 3,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 15,
        "response_value": 4,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 16,
        "response_value": 5,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 17,
        "response_value": 3,
        "question_group": 2
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 18,
        "response_value": 4,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 19,
        "response_value": 5,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 20,
        "response_value": 4,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 21,
        "response_value": 5,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 22,
        "response_value": 4,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 23,
        "response_value": 5,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 24,
        "response_value": 4,
        "question_group": 3
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 25,
        "response_value": 3,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 26,
        "response_value": 4,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 27,
        "response_value": 5,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 28,
        "response_value": 4,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 29,
        "response_value": 5,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 30,
        "response_value": 3,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 31,
        "response_value": 4,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 32,
        "response_value": 5,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 33,
        "response_value": 3,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 34,
        "response_value": 4,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 35,
        "response_value": 5,
        "question_group": 4
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 36,
        "response_value": 3,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 37,
        "response_value": 4,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 38,
        "response_value": 5,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 39,
        "response_value": 4,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 40,
        "response_value": 3,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 41,
        "response_value": 2,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 42,
        "response_value": 1,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
        "question_id": 43,
        "response_value": 0,
        "question_group": 5
    },
    {
        "survey_id": 2,
        "user_id": 79,
    "question_id": 44,
    "response_value": 1,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 45,
    "response_value": 2,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 46,
    "response_value": 3,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 47,
    "response_value": 4,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 48,
    "response_value": 5,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 49,
    "response_value": 4,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 50,
    "response_value": 3,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 51,
    "response_value": 2,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 52,
    "response_value": 1,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 53,
    "response_value": 0,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 54,
    "response_value": 1,
    "question_group": 5
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 55,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 56,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 57,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 58,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 59,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 60,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 61,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 62,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 63,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 64,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 65,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 66,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 67,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 68,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 69,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 70,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 71,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 72,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 73,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 74,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 75,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 76,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 77,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 78,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 79,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 80,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 81,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 82,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 83,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 84,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 85,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 86,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 87,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 88,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 89,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 90,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 91,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 92,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 93,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 94,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 95,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 96,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 97,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 98,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 99,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 100,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 101,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 102,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 103,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 104,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 105,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 106,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 107,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 108,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 109,
    "response_value": 0,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 110,
    "response_value": 10,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 111,
    "response_value": 20,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 112,
    "response_value": 30,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 113,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 114,
    "response_value": 50,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 115,
    "response_value": 40,
    "question_group": 6
},
{
    "survey_id": 2,
    "user_id": 79,
    "question_id": 116,
    "response_value": 30,
    "question_group": 6
}
]
]

# Modify the survey
new_survey_id = 12
new_user_id = 73
modified_json = modify_survey(json_data, new_survey_id, new_user_id)
print(modified_json)
