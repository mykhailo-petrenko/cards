package com.mapetrenko.cards.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("Flash Cards API")
            .description("Flash Cards API")
            .termsOfServiceUrl("https://github.com/mykhailo-petrenko/cards")
            .contact(new Contact(
                "Mykhailo Petrenko",
                "https://github.com/mykhailo-petrenko",
                "mykhailo.petrenko@gmail.com"
            ))
            .license("MIT")
            .licenseUrl("mykhailo.petrenko@gmail.com")
            .version("0.1")
            .build();
    }
}
