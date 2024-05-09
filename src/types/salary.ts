export interface Salary{
	id: string,
	name: string,
	basicSalary: number,
	allowances: number,
	additions: number,
	deductions: number,
	month: string,
	year: string,
	total: number,
	isEndOfService: boolean
}