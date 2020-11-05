export class DomainUtils {
    getYearsText(years: number) {
    const adjustedYears = years + 1;
    if (0 === adjustedYears) {
      return '1 year'
    } else {
      return `${adjustedYears} years`;
    }
  }
}
