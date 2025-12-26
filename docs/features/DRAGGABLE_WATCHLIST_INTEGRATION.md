# Draggable Watchlist Integration Guide

## Overview
This guide explains how to integrate the drag-and-drop watchlist with folder organization into your homepage.

## What's Been Created

### 1. Type Definitions (`/src/types/watchlist.ts`)
- `WatchlistItem`: Extended with `folderId` and `order` fields
- `WatchlistFolder`: Folders for organizing items
- `WatchlistStructure`: Container for items and folders
- Migration helper for backward compatibility

### 2. Drag-and-Drop Component (`/src/components/dashboard/components/draggable-watchlist-section.tsx`)
- Wraps your existing watchlist item rendering
- Adds drag handles and folder UI
- Maintains all existing functionality

### 3. Database Hook (`/src/hooks/use-watchlist-with-folders.ts`)
- Loads and saves watchlist structure
- Automatically migrates old data
- Maintains backward compatibility

## Integration Steps

### Step 1: Update Home Page Imports

Add these imports to `/src/components/dashboard/pages/home.tsx`:

```typescript
import { DraggableWatchlistSection } from '@/components/dashboard/components/draggable-watchlist-section';
import { useWatchlistWithFolders } from '@/hooks/use-watchlist-with-folders';
import type { WatchlistItem as WatchlistItemType } from '@/types/watchlist';
```

### Step 2: Replace useEnhancedWatchlist Hook

Find this line:
```typescript
const { watchlistItems, isLoading: isLoadingWatchlist, refreshWatchlist } = useEnhancedWatchlist();
```

Replace with:
```typescript
const {
  items: watchlistItemsRaw,
  folders,
  isLoading: isLoadingWatchlist,
  refreshWatchlist,
  updateItems,
  updateFolders,
  removeItem: removeWatchlistItem
} = useWatchlistWithFolders();
```

### Step 3: Keep Enhanced Watchlist for Data

Add this after the hook to get enhanced data:
```typescript
// Still use enhanced watchlist for fetching data
const { watchlistItems: enhancedItems } = useEnhancedWatchlist();

// Merge the structure with enhanced data
const watchlistItems = useMemo(() => {
  return watchlistItemsRaw.map(item => {
    const enhanced = enhancedItems.find(e => e.id === item.id);
    return enhanced || item;
  });
}, [watchlistItemsRaw, enhancedItems]);
```

### Step 4: Wrap Watchlist Rendering

Find the watchlist rendering section (around line 1425):
```typescript
<div className="bg-white dark:bg-gray-900/50 rounded-2xl ...">
  {watchlistItems.map((item, index) => {
    // ... existing rendering code
  })}
</div>
```

Wrap it with the DraggableWatchlistSection:
```typescript
<div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-shadow duration-300 backdrop-blur-xl overflow-hidden">
  <DraggableWatchlistSection
    items={watchlistItems}
    folders={folders}
    onUpdateItems={updateItems}
    onUpdateFolders={updateFolders}
    onItemClick={(item) => navigate(`/app/opportunities?view=watchlist&client=${encodeURIComponent(item.name)}`)}
    onRemoveItem={(itemId, itemName, event) => {
      event.preventDefault();
      event.stopPropagation();
      removeWatchlistItem(itemId);
    }}
    onAddItem={() => setShowAddClient(true)}
    renderItemContent={(item, index) => {
      // Your existing item rendering code here
      // Copy the entire content from the existing map function
      const colors = [
        '#007AFF', '#FF3B30', '#34C759', '#FF9500',
        '#AF52DE', '#FF2D92', '#00C4CC', '#5856D6'
      ];
      const itemColor = colors[index % colors.length];
      const totalEntries = item.totalMentions || 0;
      const getFirstLetter = (name: string) => name.charAt(0).toUpperCase();
      const hasImage = item.image && item.image.trim() !== '';

      return (
        <div className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-all duration-200 py-5 first:rounded-t-2xl last:rounded-b-2xl relative">
          {/* All your existing item rendering JSX */}
          {/* ... */}
        </div>
      );
    }}
  />
</div>
```

## Features

### For Users:
1. **Drag to Reorder**: Hover over an item, grab the handle (appears on left), drag to reorder
2. **Create Folders**: Click "Create Folder" button when you have 5+ items
3. **Organize Items**: Drag items into folders
4. **Collapse Folders**: Click folder name to collapse/expand
5. **Custom Colors**: Choose a color for each folder

### For Developers:
- **Automatic Migration**: Existing data is automatically converted
- **Backward Compatible**: Old `clients` array still works
- **Type Safe**: Full TypeScript support
- **Persistent**: All changes saved to Firestore

## Database Structure

### Old Format:
```typescript
users/{userId}
  clients: [
    { id, name, topics, searchTerms, ... }
  ]
```

### New Format:
```typescript
users/{userId}
  watchlistStructure: {
    items: [
      { id, name, topics, searchTerms, folderId, order, ... }
    ],
    folders: [
      { id, name, color, isExpanded, order, createdAt }
    ]
  }
  clients: [...] // Kept for backward compatibility
```

## Testing

1. Load the homepage - existing items should appear normally
2. Hover over an item - drag handle should appear on left
3. Drag an item - should reorder smoothly
4. Create a folder - should appear above items
5. Drag an item into a folder - should nest properly
6. Refresh page - order and folders should persist

## Troubleshooting

**Items not appearing**: Check console for errors, ensure `useWatchlistWithFolders` is loading

**Drag not working**: Ensure @dnd-kit packages are installed (`npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`)

**Data not persisting**: Check Firestore permissions, ensure user is authenticated

## Next Steps

- Add context menu to move items between folders
- Add bulk operations (move multiple items)
- Add folder search/filter
- Add folder icons/emojis
