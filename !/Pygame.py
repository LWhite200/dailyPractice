import pygame
import sys
import time

pygame.init()

# Setup
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pygame Full Template")
clock = pygame.time.Clock()

font = pygame.font.SysFont(None, 28)
big_font = pygame.font.SysFont(None, 40)

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE  = (0, 100, 255)
RED   = (255, 0, 0)
GRAY  = (200, 200, 200)

# Timer
start_time = time.time()
elapsed_time = 0

# Button
button_rect = pygame.Rect(600, 100, 150, 50)
button_clicked = False

# Load image
try:
    image = pygame.image.load("example.png")
    image = pygame.transform.scale(image, (100, 100))
except:
    image = pygame.Surface((100, 100))
    image.fill(GRAY)

# Circle position
circle_pos = [400, 300]

# Last key pressed
last_key = ""

running = True
while running:
    screen.fill(WHITE)
    dt = clock.tick(60)  # Limit to 60 FPS
    fps = int(clock.get_fps())

    elapsed_time = min(time.time() - start_time, 10)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Mouse input
        if event.type == pygame.MOUSEBUTTONDOWN:
            if button_rect.collidepoint(event.pos):
                button_clicked = not button_clicked

        # Key press
        if event.type == pygame.KEYDOWN:
            if event.unicode.isalnum():
                last_key = event.unicode

    # Keyboard hold
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]: circle_pos[0] -= 5
    if keys[pygame.K_RIGHT]: circle_pos[0] += 5
    if keys[pygame.K_UP]: circle_pos[1] -= 5
    if keys[pygame.K_DOWN]: circle_pos[1] += 5

    # --- Drawing ---
    pygame.draw.rect(screen, BLUE, (100, 100, 120, 80))  # Rectangle
    pygame.draw.circle(screen, RED, circle_pos, 30)      # Circle
    screen.blit(image, (300, 300))                       # Image

    # Draw button
    pygame.draw.rect(screen, GRAY, button_rect)
    screen.blit(big_font.render("Click Me", True, BLACK), (button_rect.x + 20, button_rect.y + 10))

    # Draw text info
    screen.blit(font.render(f"FPS: {fps}", True, BLACK), (20, 20))
    screen.blit(font.render(f"Timer: {elapsed_time:.1f}/10 sec", True, BLACK), (20, 50))
    screen.blit(font.render(f"Key Pressed: {last_key}", True, BLACK), (20, 80))
    screen.blit(font.render(f"Button clicked: {button_clicked}", True, BLACK), (20, 110))

    pygame.display.flip()

pygame.quit()
sys.exit()
