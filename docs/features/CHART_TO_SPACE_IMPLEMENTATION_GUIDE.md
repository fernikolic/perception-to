# Chart-to-Space Implementation Guide

## ✅ COMPLETED (Steps 1-2)

### Step 1: Extended SpaceItem Type ✓
**File**: `/src/hooks/use-spaces.ts`
- Added `ChartData` interface (lines 38-50)
- Updated `SpaceItem.type` to include `'chart'` (line 55)
- Added `chartData?` field to `SpaceItem` (line 65)

### Step 2: Added addChartToSpace Hook Method ✓
**File**: `/src/hooks/use-spaces.ts`
- Implemented `addChartToSpace()` method (lines 307-341)
- Exported method in return statement (line 469)

---

## ✅ COMPLETED STEPS (Steps 3-4)

### Step 3: Created AddChartToSpaceButton Component ✓
**File**: `/src/components/add-chart-to-space-button.tsx`
- ✅ Component created with html2canvas integration
- ✅ Space dropdown with "Create New Space" option
- ✅ Chart capture at 3x scale for quality
- ✅ Loading states and error handling
- ✅ Exports ChartMetadata interface

### Step 4: Updated space-detail.tsx to Render Charts ✓
**File**: `/src/components/dashboard/pages/space-detail.tsx`
- ✅ Added BarChart3, Calendar, TrendingUp icons to imports (lines 32-34)
- ✅ Added chart rendering in ThreadCard component (lines 1077-1149)
- ✅ Displays chart image, metadata, and notes
- ✅ Delete functionality with dropdown menu
- ✅ Consistent styling with existing trend/article cards

---

## 🚧 REMAINING STEP (Step 5)

### Step 3: Create AddChartToSpaceButton Component

**File to create**: `/src/components/add-chart-to-space-button.tsx`

```typescript
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { FolderPlus, Loader2, Plus } from 'lucide-react';
import { useSpaces, type ChartData } from '@/hooks/use-spaces';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface ChartMetadata {
  title: string;
  type: 'volume' | 'sentiment' | 'comparative' | 'narrative' | 'outlet-distribution' | 'topic-sentiment' | 'fear-greed' | 'trend';
  timeRange: string;
  dataPoints: number;
  clientName?: string;
  keywords?: string[];
  description?: string;
}

interface AddChartToSpaceButtonProps {
  chartRef: React.RefObject<HTMLElement>;
  chartMetadata: ChartMetadata;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function AddChartToSpaceButton({
  chartRef,
  chartMetadata,
  variant = 'ghost',
  size = 'sm',
}: AddChartToSpaceButtonProps) {
  const { spaces, addChartToSpace, createSpace } = useSpaces();
  const [isCapturing, setIsCapturing] = useState(false);

  const captureChart = async (): Promise<string | null> => {
    if (!chartRef.current) {
      toast.error('Chart not found');
      return null;
    }

    try {
      setIsCapturing(true);

      // Capture chart as image using html2canvas
      const canvas = await html2canvas(chartRef.current, {
        scale: 3, // High quality
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imageDataUrl = canvas.toDataURL('image/png');
      return imageDataUrl;
    } catch (error) {
      console.error('Error capturing chart:', error);
      toast.error('Failed to capture chart');
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const handleAddToSpace = async (spaceId: string) => {
    const imageUrl = await captureChart();
    if (!imageUrl) return;

    const chartData: ChartData = {
      title: chartMetadata.title,
      type: chartMetadata.type,
      timeRange: chartMetadata.timeRange,
      dataPoints: chartMetadata.dataPoints,
      imageUrl,
      metadata: {
        clientName: chartMetadata.clientName,
        keywords: chartMetadata.keywords,
        period: new Date().toISOString(),
        description: chartMetadata.description,
      },
    };

    await addChartToSpace(spaceId, chartData);
  };

  const handleCreateNewSpace = async () => {
    const imageUrl = await captureChart();
    if (!imageUrl) return;

    // Create space with chart title
    const spaceTitle = `${chartMetadata.title} Analysis`;
    const spaceId = await createSpace(spaceTitle);

    if (spaceId) {
      // Add chart to the newly created space
      const chartData: ChartData = {
        title: chartMetadata.title,
        type: chartMetadata.type,
        timeRange: chartMetadata.timeRange,
        dataPoints: chartMetadata.dataPoints,
        imageUrl,
        metadata: {
          clientName: chartMetadata.clientName,
          keywords: chartMetadata.keywords,
          period: new Date().toISOString(),
          description: chartMetadata.description,
        },
      };

      await addChartToSpace(spaceId, chartData);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={isCapturing}>
          {isCapturing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Capturing...
            </>
          ) : (
            <>
              <FolderPlus className="h-4 w-4 mr-2" />
              Add to Space
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Space</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {spaces.length > 0 ? (
          <>
            {spaces.slice(0, 5).map((space) => (
              <DropdownMenuItem
                key={space.id}
                onClick={() => handleAddToSpace(space.id)}
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                {space.title}
              </DropdownMenuItem>
            ))}
            {spaces.length > 5 && (
              <DropdownMenuItem disabled className="text-xs text-gray-500">
                + {spaces.length - 5} more spaces
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </>
        ) : (
          <DropdownMenuItem disabled className="text-gray-500">
            No spaces yet
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleCreateNewSpace}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Space
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### Step 4: Update space-detail.tsx to Render Charts

**File to modify**: `/src/components/dashboard/pages/space-detail.tsx`

Find the `ThreadCard` component (around lines 1070-1191) and add chart rendering:

```typescript
// Add this BEFORE the existing trend/article rendering in ThreadCard

if (item.type === 'chart' && item.chartData) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800"
      style={motionStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="p-5 flex items-start justify-between gap-4">
        {/* Chart content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.chartData.title}
            </h3>
          </div>

          {/* Chart image */}
          <img
            src={item.chartData.imageUrl}
            alt={item.chartData.title}
            className="w-full rounded-lg border border-gray-200 dark:border-slate-700 mb-3"
          />

          {/* Chart metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {item.chartData.timeRange}
            </span>
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {item.chartData.dataPoints} data points
            </span>
            <span className="capitalize">{item.chartData.type} chart</span>
            {item.chartData.metadata?.clientName && (
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {item.chartData.metadata.clientName}
              </span>
            )}
          </div>

          {/* Notes if present */}
          {item.notes && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-md">
              <p className="text-sm text-gray-700 dark:text-slate-300">{item.notes}</p>
            </div>
          )}
        </div>

        {/* Delete button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDelete()}
              className="text-red-600 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete from space
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
```

**Add imports at top of file:**
```typescript
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';
```

---

### Step 5: Add Chart Buttons to Chart Components

For each chart component in `/src/components/dashboard/components/`, add the button.

**Example for volume-chart.tsx:**

```typescript
import { AddChartToSpaceButton } from '@/components/add-chart-to-space-button';
import { useRef } from 'react';

export function VolumeChart({ clientName, timeRange, data }) {
  const chartRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Discussion Volume</h3>
        <AddChartToSpaceButton
          chartRef={chartRef}
          chartMetadata={{
            title: 'Discussion Volume',
            type: 'volume',
            timeRange: `${timeRange} days`,
            dataPoints: data.length,
            clientName: clientName,
            description: 'Volume of discussions over time'
          }}
        />
      </div>

      <div ref={chartRef}>
        {/* Existing chart rendering code */}
      </div>
    </div>
  );
}
```

**Chart components to update (9 files):**

1. `/src/components/dashboard/components/volume-chart.tsx` (206 lines) - AreaChart
2. `/src/components/dashboard/components/discussion-volume-chart.tsx` (174 lines) - BarChart
3. `/src/components/dashboard/components/sentiment-evolution.tsx` (282 lines) - Nivo ResponsiveBar
4. `/src/components/dashboard/components/trend-chart.tsx` (62 lines) - LineChart
5. `/src/components/dashboard/components/topic-sentiment-chart.tsx` (278 lines) - Custom component
6. `/src/components/dashboard/components/comparative-sentiment-chart.tsx` (279 lines) - PieChart
7. `/src/components/outlet-distribution-chart.tsx` (332 lines) - PieChart + BarChart
8. `/src/components/dashboard/components/narrative-distribution.tsx` (1777 lines) - ComposedChart
9. `/src/components/dashboard/components/fear-and-greed.tsx` (268 lines) - LineChart

**Note**: All charts already have ShareButton components integrated for export functionality

---

## 🎯 TESTING CHECKLIST

After implementation, test:

1. ✓ Chart capture works (image quality good at 3x scale)
2. ✓ Chart appears in space threads section
3. ✓ Chart metadata displays correctly
4. ✓ Delete chart from space works
5. ✓ Multiple charts can be added to same space
6. ✓ Charts persist across page reloads
7. ✓ Works with all chart types

---

## 🔮 OPTIONAL ENHANCEMENTS (Phase 3)

### Include Charts in Reports

**File**: `/functions/src/space-report-generator.ts`

Around line 263, after processing trends and articles:

```typescript
// Extract chart items
const chartItems = briefItems.filter(item => item.category === 'chart');

// In the prompt, add chart visualization section
${chartItems.length > 0 ? `

## VISUAL ANALYTICS

${chartItems.map((item, i) => `
### ${item.title}

![${item.title}](${item.url})

**Chart Type:** ${item.chartData?.type}
**Time Range:** ${item.chartData?.metadata?.period}
**Data Points:** ${item.dataPoints}
`).join('\n\n')}

` : ''}
```

---

## 📊 ARCHITECTURE SUMMARY

```
User Action: Click "Add to Space" on Chart
    ↓
html2canvas captures chart as base64 PNG (3x scale)
    ↓
AddChartToSpaceButton creates ChartData object
    ↓
addChartToSpace() hook method called
    ↓
Firestore: spaces/{spaceId}.items[] updated
    ↓
Space Detail page re-renders
    ↓
ThreadCard component renders chart image
```

---

## 🐛 TROUBLESHOOTING

**Issue**: Chart image quality poor
**Fix**: Increase html2canvas scale to 4x or add retina display detection

**Issue**: Base64 images too large (>256MB Firestore limit)
**Fix**: Implement PNG compression or switch to Cloud Storage URLs

**Issue**: Chart doesn't capture (blank image)
**Fix**: Ensure chart is fully rendered before capture, add delay if needed

---

## 📝 FILES MODIFIED SUMMARY

1. ✅ `/src/hooks/use-spaces.ts` - Added ChartData, addChartToSpace
2. ⏳ `/src/components/add-chart-to-space-button.tsx` - New component
3. ⏳ `/src/components/dashboard/pages/space-detail.tsx` - Chart rendering
4. ⏳ Chart components (8 files) - Add button to each

---

End of implementation guide. Good luck!