/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentStudent } from '../types';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(0, 1);
  }
}
@Pipe({
  name: 'trimName'
})
export class TrimNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 8) {
      return value.substring(0, 10) 
    }
    return value;
  }
}
@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe {
  transform<T>(items: T[] | null, searchText: string): T[] | null {
    if (!items) return [];
    if (searchText === '') return items;
    return items.filter((item) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(searchText.toLowerCase());
      } else if (typeof item === 'object') {
        return Object.values(item as any).some(
          (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
      } else {
        return false;
      }
    });
  }
}
@Pipe({
  name: 'OrderBy'
})
export class OrderByPipe {
  transform(
    item: AssignmentStudent[] | null,
    order: 'asc' | 'desc' = 'asc'
  ): AssignmentStudent[] | null {
    if (item) {
      return item.sort((a, b) => {
        const dateA = new Date(a.assignment.deadline).getTime();
        const dateB = new Date(b.assignment.deadline).getTime();

        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
    return null;
  }
}
