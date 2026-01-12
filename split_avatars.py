from PIL import Image
import os

def split_avatar_set(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path)
    width, height = img.size
    
    # Grid is 4 columns x 3 rows based on the generated image
    cols = 4
    rows = 3
    
    tile_w = width // cols
    tile_h = height // rows
    
    count = 1
    for r in range(rows):
        for c in range(cols):
            left = c * tile_w
            top = r * tile_h
            right = (c + 1) * tile_w
            bottom = (r + 1) * tile_h
            
            # Crop and save
            avatar = img.crop((left, top, right, bottom))
            avatar.save(os.path.join(output_dir, f'avatar_{count}.png'))
            print(f'Saved avatar_{count}.png')
            count += 1

if __name__ == "__main__":
    input_file = r"C:\Users\FREE\.gemini\antigravity\brain\9714cde9-3336-40a1-bec6-0c0163482e9d\guest_avatars_person_set_1767593505682.png"
    output_folder = r"F:\genmini\japness\변환\fam\images\avatars"
    split_avatar_set(input_file, output_folder)
