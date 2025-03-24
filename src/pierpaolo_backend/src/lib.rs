use ic_cdk_macros::{init, query, update};
use candid::{CandidType, Deserialize};
use std::cell::RefCell;

#[derive(Default, CandidType, Deserialize)]
struct CanisterState {
    somma_totale: i64,
}

thread_local! {
    static STATO: RefCell<CanisterState> = RefCell::default();
}

#[init]
fn init() {
    STATO.with(|stato| {
        *stato.borrow_mut() = CanisterState { somma_totale: 0 };
    });
}

#[update]
fn aggiungi_numero(numero: i64) -> i64 {
    STATO.with(|stato| {
        let mut stato_mut = stato.borrow_mut();
        stato_mut.somma_totale += numero;
        stato_mut.somma_totale
    })
}

#[query]
fn ottieni_somma_totale() -> i64 {
    STATO.with(|stato| stato.borrow().somma_totale)
}