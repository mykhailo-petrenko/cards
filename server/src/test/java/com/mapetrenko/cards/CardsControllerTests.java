package com.mapetrenko.cards;

import com.mapetrenko.cards.model.Card;
import com.mapetrenko.cards.service.CardsService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.security.Principal;

import static org.mockito.Mockito.when;


@RunWith(SpringRunner.class)
@WebMvcTest(CardsController.class)
@ActiveProfiles("test")
public class CardsControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CardsService cardsService;

    @MockBean
    private Principal mockPrincipal;

    @Before
    public void authorize() {
        when(mockPrincipal.getName())
            .thenReturn("mikael.petrenko@gmail.com");
    }

    @Test
    public void getCardByIdSmockTest() throws Exception {
        Card mCard = new Card("What is the meaning of the life?", "42");

        when(cardsService.getCardById(1L, "mikael.petrenko@gmail.com"))
            .thenReturn(mCard);

        MvcResult result = mvc.perform(MockMvcRequestBuilders
            .get("/api/v1/cards/1")
            .principal(mockPrincipal)
            .accept(MediaType.APPLICATION_JSON)
        ).andReturn();

        System.out.println(result);

        Assert.assertEquals(200, result.getResponse().getStatus());
    }
}
