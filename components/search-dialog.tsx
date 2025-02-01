'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full p-0">
        <DialogTitle className="sr-only">Search for ingredient</DialogTitle>
        <div className="flex flex-col h-full">
          <div className="px-4 pt-6">
            <div className="relative flex items-center mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search ingredients"
                className="pl-10 h-12 w-full"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="px-4 pt-6 flex-1 overflow-auto">
            {!searchQuery && (
              <>
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Recent searches</h3>
                  {/* Add recent searches list here */}
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Common substitutions</h3>
                  {/* Add common substitutions list here */}
                </div>
              </>
            )}
          </div>

          <div className="px-4 py-4 border-t mt-auto">
            <div className="flex items-center justify-between">
              <button className="text-sm underline">Clear all</button>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
