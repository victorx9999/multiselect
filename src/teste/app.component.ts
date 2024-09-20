import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface Option {
  value?: string;
  label?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  options: Option[] = [];
  selectedOptions: Option[] = [];
  filteredOptions: Option[] = [];
  searchTerm: string = '';
  dropdownOpen: boolean = false;

  ngOnInit(): void {
    this.populateOptions();
    this.filteredOptions = [...this.options];
  }

  populateOptions(): void {
    for (let i = 1; i <= 10000; i++) {
      this.options.push({ value: i.toString(), label: `Opção ${i}` });
    }
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
      this.filteredOptions = this.options.filter(option =>
        (option.label || option.value || '').toLowerCase().includes(this.searchTerm.toLowerCase())
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
