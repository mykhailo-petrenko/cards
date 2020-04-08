package com.mapetrenko.cards;

import com.mapetrenko.cards.model.Card;
import com.mapetrenko.cards.service.CardsService;
import junitparams.JUnitParamsRunner;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.security.Principal;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//https://www.javacodegeeks.com/2015/08/parameterized-integration-tests-with-spring-junit-rules.html
@RunWith(JUnitParamsRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class CardsControllerTests {

    @ClassRule
    public static final SpringClassRule SCR = new SpringClassRule();

    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

    @Autowired
    protected WebApplicationContext context;

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

    @Before
    public void setupMockMvc() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .alwaysDo(print())
                .build();
    }

    @Test
    public void getCardByIdSmockTest() throws Exception {
        Card mCard = new Card("What is the meaning of the life?", "42");

        when(cardsService.getCardById(1L, "mikael.petrenko@gmail.com"))
                .thenReturn(mCard);

        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders
                .get("/api/v1/cards/1")
                .principal(mockPrincipal)
                .accept(MediaType.APPLICATION_JSON)
        );
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(0)))
                .andExpect(jsonPath("$.question", is("What is the meaning of the life?")))
                .andExpect(jsonPath("$.answer", is("42")));

        System.out.println(resultActions.andReturn());
    }
}
