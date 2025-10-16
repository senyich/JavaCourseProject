package com.japancats.DTO;
import java.math.BigDecimal;
import com.japancats.entity.Part;

public class PartDTO {
    private Long id;
    private String partNumber;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer quantity;
    private String manufacturer;

    public PartDTO() {}

    public PartDTO(Part part) {
        this.id = part.getId();
        this.partNumber = part.getPartNumber();
        this.name = part.getName();
        this.description = part.getDescription();
        this.price = part.getPrice();
        this.quantity = part.getQuantity();
        this.manufacturer = part.getManufacturer();
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
}
