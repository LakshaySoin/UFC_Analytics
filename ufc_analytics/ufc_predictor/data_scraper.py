# Implement dependencies for web scraping
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from seleniumbase import SB
import pandas as pd
import time

def scrape_ufc_stats():
    all_fights = []

    with SB(uc=True) as driver:
        driver.maximize_window()

        driver.get("http://ufcstats.com/statistics/events/completed")

        upcoming_fight = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '/html/body/section/div/div/div/div[2]/div/table/tbody/tr[2]/td[1]/i/a'))
        )

        upcoming_fight.click()

        view_matchups = driver.find_elements(By.XPATH, '/html/body/section/div/div/table/tbody/tr')

        for matchup in view_matchups:
            matchup.click()
            # Get each fighter data for logistic regression model here
            fighter_stats = {}

            # Get fighter names and setup the stats
            fighter_names = driver.find_elements(By.XPATH, '/html/body/section/div/div/section/table/thead/tr/th')
            red_fighter = fighter_names[1].text.title().split(" ")
            blue_fighter = fighter_names[2].text.title().split(" ")
            try:
                fighter_stats['RedFighter'] = red_fighter[0] + " " + red_fighter[1]
                fighter_stats['BlueFighter'] = blue_fighter[0] + " " + blue_fighter[1]
            except:
                pass

            # Get stats and add them to respective fighter_stats array
            fighter_records = driver.find_elements(By.XPATH, '/html/body/section/div/div/section/table/tbody/tr[2]/td')
            red_fighter_record = fighter_records[1].text.split("-")
            blue_fighter_record = fighter_records[2].text.split("-")
            fighter_stats['WinDif'] = int(red_fighter_record[0]) - int(blue_fighter_record[0])
            fighter_stats['LossDif'] = int(red_fighter_record[1]) - int(blue_fighter_record[1])

            fighter_sig_str = driver.find_elements(By.XPATH, '/html/body/section/div/div/section/table/tbody/tr[10]/td')
            red_fighter_sig_str = fighter_sig_str[1].text
            blue_fighter_sig_str = fighter_sig_str[2].text
            fighter_stats['SigStrDif'] = float(red_fighter_sig_str) - float(blue_fighter_sig_str)

            fighter_sub_att = driver.find_elements(By.XPATH, '/html/body/section/div/div/section/table/tbody/tr[18]/td')
            red_fighter_sub_att = fighter_sub_att[1].text
            blue_fighter_sub_att = fighter_sub_att[2].text
            fighter_stats['AvgSubAttDif'] = float(red_fighter_sub_att) - float(blue_fighter_sub_att)

            fighter_td_avg = driver.find_elements(By.XPATH, '/html/body/section/div/div/section/table/tbody/tr[15]/td')
            red_fighter_td_avg = fighter_td_avg[1].text
            blue_fighter_td_avg = fighter_td_avg[2].text
            fighter_stats['AvgTDDif'] = float(red_fighter_td_avg) - float(blue_fighter_td_avg)

            all_fights.append(fighter_stats)

            # Go back to the matchup page

            time.sleep(2)
            driver.execute_script("window.history.go(-1)")

        time.sleep(2)

        driver.get("https://fightodds.io/")
        betting_odds = driver.find_elements(By.XPATH, '//*[@id="app"]/div[3]/div/nav/div[2]/div/div/div/div[1]/div/table/tbody/tr')
        index = 0
        found = [False] * 2
        for i in range(len(betting_odds)):
            curr_fight_odds = betting_odds[i].text.split("\n")
            fighter_name_arr = curr_fight_odds[0].split(" ")[:2]
            curr_fighter = fighter_name_arr[0] + " " + fighter_name_arr[1]
            if (index >= len(all_fights)):
                break

            try:
                if (curr_fighter == all_fights[index]['RedFighter']):
                    all_fights[index]['RedOdds'] = int(curr_fight_odds[1])
                    found[0] = True
                elif (curr_fighter == all_fights[index]['BlueFighter']):
                    all_fights[index]['BlueOdds'] = int(curr_fight_odds[1])
                    found[1] = True
            except:
                pass

            if ((found[0] and found[1]) or i % 2 == 1):
                index += 1
                found = [False] * 2

    df = pd.DataFrame(all_fights)
    df.to_csv('upcoming-scraped.csv', index=False)

scrape_ufc_stats()