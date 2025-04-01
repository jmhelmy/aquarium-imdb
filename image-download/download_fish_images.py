import os
import pandas as pd
from icrawler.builtin import GoogleImageCrawler

# === CONFIG ===
csv_path = '/Users/johnhelmy/aquarium-imdb/aquarium-imdb-tailwind/freshwater_fish_with_corydoras_and_glofish.csv'
output_base_dir = '/Users/johnhelmy/aquarium-imdb/aquarium-imdb-tailwind/fish-images'
images_per_fish = 10

# === READ CSV ===
df = pd.read_csv(csv_path)
fish_names = df['name'].dropna().unique()

# === DOWNLOAD IMAGES ===
for fish in fish_names:
    # Create safe folder name
    safe_folder_name = fish.replace(" ", "_").replace("/", "_")
    output_dir = os.path.join(output_base_dir, safe_folder_name)
    os.makedirs(output_dir, exist_ok=True)

    # Download images
    crawler = GoogleImageCrawler(storage={'root_dir': output_dir})
    crawler.crawl(keyword=fish, max_num=images_per_fish)

    print(f"✅ Downloaded images for: {fish}")
