import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: '98b6bd48-6f29-4a62-85bb-35a18223b64e',
        description: 'Unique identifier of the product',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Camisa51',
        description: 'Title of the product',
        uniqueItems: true,
    })
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Price of the product',
    })
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'This is a product description',
        description: 'Description of the product',
        default: null,
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example: 'camisa51',
        description: 'Slug of the product',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    slug: string;

    @ApiProperty({
        example: 0,
        description: 'Stock of the product',
    })
    @Column('int', {
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example: [
            "SM",
            "M"
        ],
        description: 'Sizes of the product',
    })
    @Column('text', {
        array: true,
    })
    sizes: string[];

    @ApiProperty({
        example: 'men',
        description: 'Gender of the product',
    })
    @Column('text')
    gender: string

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.setSlug();
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.setSlug();
    }

    setSlug() {
        this.slug = this.slug
            .toLowerCase()
            .replace(' ', '_')
            .replace("'", '');
    }

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true,
            eager: true,
        }

    )
    images?: ProductImage[];

    @Column('text', {
        array: true,
        default: [],
    })
    tags: string[];
}
