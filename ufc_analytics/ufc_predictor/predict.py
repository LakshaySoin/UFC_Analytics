from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
import os

def create_ratings(ufc):
    fighters = []
    for red in ufc['RedFighter']:
        if (red not in fighters):
            fighters.append(red)
    for blue in ufc['BlueFighter']:
        if (blue not in fighters):
            fighters.append(blue)
    ratings = {}
    for fighter in fighters:
        ufc_red_fighter = ufc[(ufc['RedFighter'] == fighter)]
        ufc_blue_fighter = ufc[(ufc['BlueFighter'] == fighter)]
        r1 = 3 * ufc_red_fighter['Result'].sum() + 5 * np.sum(20 - ufc_red_fighter[ufc_red_fighter['Result'] == 1]['BMatchWCRank'].fillna(15)) + 8 * len(ufc_red_fighter[ufc_red_fighter['TitleBout'] == True]) + 15 * len(ufc_red_fighter[ufc_red_fighter['Result'] == 1]['TitleBout'] == True)
        r2 = 3 * ufc_blue_fighter['Result'].sum() + 5 * np.sum(20 - ufc_blue_fighter[ufc_blue_fighter['Result'] == 0]['RMatchWCRank'].fillna(15)) + 8 * len(ufc_blue_fighter[ufc_blue_fighter['TitleBout'] == True]) + 15 * len(ufc_blue_fighter[ufc_blue_fighter['Result'] == 0]['TitleBout'] == True)
        rating = r1 + r2
        ratings[fighter] = rating
    return ratings

def process(df, ufc, ratings):
    df['BlueWrestler'] = ufc['BlueAvgTDLanded'].apply(lambda x: 1 if x > 2 else 0)
    df['RedWrestler'] = ufc['RedAvgTDLanded'].apply(lambda x: 1 if x > 2 else 0)
    columns = ['RedOdds', 
           'BlueOdds',
           'WinDif',
           'LossDif',
           'SigStrDif',
           'AvgSubAttDif',
           'AvgTDDif',
           'BlueWrestler',
           'RedWrestler',
           'RedFighter',
           'BlueFighter'
          ]
    X = df[columns]
    X['RedELO'] = X['RedFighter'].map(ratings)
    X['BlueELO'] = X['BlueFighter'].map(ratings)
    X = X.drop(['RedFighter', 'BlueFighter'], axis=1)
    return X.fillna(0)

def main(data, event):
    ufc = pd.read_csv('ufc-master.csv')
    winner_dict = {'Red': 1, 'Blue': 0}
    ufc['Result'] = ufc['Winner'].map(winner_dict)
    ufc['BlueWrestler'] = ufc['BlueAvgTDLanded'].apply(lambda x: 1 if x > 2 else 0)
    ufc['RedWrestler'] = ufc['RedAvgTDLanded'].apply(lambda x: 1 if x > 2 else 0)
    columns = ['RedOdds', 
            'BlueOdds',
            'WinDif',
            'LossDif',
            'SigStrDif',
            'AvgSubAttDif',
            'AvgTDDif',
            'BlueWrestler',
            'RedWrestler',
            'Result'
            ]
    ufc_new = ufc[columns]
    ufc_new = ufc_new.fillna(0)

    ratings = create_ratings(ufc)
    ufc_new['RedELO'] = ufc['RedFighter'].map(ratings)
    ufc_new['BlueELO'] = ufc['BlueFighter'].map(ratings)

    X = ufc_new.drop(columns=['Result'])
    y = ufc_new['Result']

    lm = LogisticRegression()
    lm.fit(X, y)

    preds = lm.predict(process(data, ufc, ratings))

    result = data[['RedFighter', 'BlueFighter']]
    result['Result'] = preds
    
    output_dir = "../ufc_website/public/"
    result.to_csv(output_dir + event + ".csv", index=False)

data = pd.read_csv('upcoming-scraped.csv')
event = "FightNight3"
main(data, event)
