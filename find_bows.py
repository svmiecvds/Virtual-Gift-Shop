from PIL import Image
import numpy as np

img = Image.open('assets/giftbg.webp').convert('RGB')
data = np.array(img)
h, w, _ = data.shape

# Find pixels that are very red.
# Red channel > 100, Green < 50, Blue < 50
mask = (data[:,:,0] > 100) & (data[:,:,1] < 50) & (data[:,:,2] < 50)

# Get coordinates
y, x = np.where(mask)

# Group into top/bottom
top_mask = y < h // 2
bottom_mask = y >= h // 2

if np.any(top_mask):
    top_y = np.median(y[top_mask])
    print(f"Top bow y center: {top_y} (ratio: {top_y/h:.4f})")

if np.any(bottom_mask):
    bottom_y = np.median(y[bottom_mask])
    print(f"Bottom bow y center: {bottom_y} (ratio: {bottom_y/h:.4f})")

