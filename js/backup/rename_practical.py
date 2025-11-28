import sys

# Read the file
with open('conversation_practical.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replacements
replacements = {
    'conversationModuleData': 'practicalConversationData',
    'currentConversationCategory': 'currentPracticalCategory',
    'currentConversationIndex': 'currentPracticalIndex',
    'initConversation': 'initPractical',
    'renderNavigation': 'renderPracticalNav',
    'openConversationLesson': 'openPracticalLesson',
    'updateNavigationStyles': 'updatePracticalNavStyles',
    'createFlipCardHTML': 'createPracticalCard',
    'displayCurrentConversation': 'displayPractical',
    'toggleCardFlip': 'togglePracticalFlip',
    'AudioController': 'PracticalAudio',
    'startCategoryAutoPlay': 'startPracticalAutoPlay',
    'updateNavigationButtons': 'updatePracticalNav',
    'previousConversation': 'prevPractical',
    'nextConversation': 'nextPractical',
    'conversation-content': 'practical-conversation-content',
    'conversation-viewer': 'practical-viewer',
    'conversation-styles': 'practical-styles',
    'conv-prev-btn': 'practical-prev-btn',
    'conv-next-btn': 'practical-next-btn',
    'global-auto-play-btn': 'practical-auto-play-btn'
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Write back
with open('conversation_practical.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
