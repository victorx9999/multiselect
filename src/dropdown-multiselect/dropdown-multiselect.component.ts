import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

interface Option {
  value?: string;
  label?: string;
  index?: number;
}

@Component({
  selector: 'app-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styleUrls: ['./dropdown-multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMultiselectComponent implements OnInit {
  @Input() options: Option[] = [];
  @Output() selectedOptionsChange = new EventEmitter<Option[]>();
  selectedOptions: Option[] = [];
  filteredOptions: Option[] = [];
  searchTerm: string = '';
  dropdownOpen: boolean = false;
  optionMap: { [key: number]: Option } = {};

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
    this.options.forEach(option => {
      this.optionMap[option.index!] = option;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.resetSearch();
    }
  }

  getSelectedLabels(): string {
    const maxDisplay = 3;
    const displayedOptions = this.selectedOptions.slice(0, maxDisplay);
    const moreCount = this.selectedOptions.length - maxDisplay;
  
    let labels = displayedOptions
      .map(option => option.label || option.value)
      .join(', ');
  
    if (moreCount > 0) {
      labels += ` e mais ${moreCount}`;
    }
  
    return labels;
  }

  filterOptions() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        (option.label || option.value || '').toLowerCase().includes(searchTermLower)
      );
    } else {
      this.filteredOptions = [...this.options];
    }
  }

  onSelectOption(option: Option) {
    if (this.isSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        selected => selected.value !== option.value
      );
    } else {
      this.selectedOptions.push(option);
    }
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  isSelected(option: Option): boolean {
    return this.selectedOptions.some(selected => selected.value === option.value);
  }

  resetSearch() {
    this.searchTerm = '';
    this.filteredOptions = [...this.options];
  }

  trackByFn(index: number, item: Option) {
    return item.value;
  }
}
