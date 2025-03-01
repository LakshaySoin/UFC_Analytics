import subprocess

def main():
    try:
        # Run the data_scraper script
        print("Running data_scraper.py...")
        subprocess.run(["python3", "data_scraper.py"], check=True)
        
        # Run the predict script
        print("Running predict.py...")
        subprocess.run(["python3", "predict.py"], check=True)
        
        print("Both scripts executed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running scripts: {e}")
    except FileNotFoundError:
        print("Ensure the scripts are named correctly and exist in the same directory.")

if __name__ == "__main__":
    main()