import { Field, Int, ObjectType } from '@nestjs/graphql'
import { FinanceCategoryTypeDto } from '#models/finance-category-type/dto/finance-category-type.dto'

@ObjectType()
export class FinanceCategoryDto {
	@Field(() => Int)
	id: number

	@Field()
	name: string

	@Field(() => FinanceCategoryTypeDto)
	type: FinanceCategoryTypeDto
}