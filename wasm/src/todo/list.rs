use super::todo::Todo;
use once_cell::sync::Lazy;
use std::sync::Mutex;
use wasm_bindgen::prelude::*;

static TODOS: Lazy<Mutex<Vec<Todo>>> = Lazy::new(|| Mutex::new(vec![]));

#[wasm_bindgen]
pub struct List;

#[wasm_bindgen]
impl List {
    pub fn show() -> JsValue {
        let todos = &*(TODOS.lock().unwrap());
        // https://rustwasm.github.io/wasm-bindgen/reference/arbitrary-data-with-serde.html#send-it-to-javascript-with-jsvaluefrom_serde
        JsValue::from_serde(&todos).unwrap()
    }

    // https://rustwasm.github.io/wasm-bindgen/reference/arbitrary-data-with-serde.html#receive-it-from-javascript-with-jsvalueinto_serde
    pub fn create(val: &JsValue) {
        let todo: Todo = val.into_serde().unwrap();
        TODOS.lock().unwrap().push(todo);
    }

    pub fn update(val: &JsValue) {
        let todo: Todo = val.into_serde().unwrap();
        let id = todo.id();
        let text = todo.text();

        let todos = &mut *(TODOS.lock().unwrap());
        let todo = todos.iter_mut().find(|t| t.id() == id);
        if let Some(todo) = todo {
            todo.set_text(text);
        }
    }

    pub fn delete(id: &JsValue) {
        let id: String = id.into_serde().unwrap();
        let todos = &mut *(TODOS.lock().unwrap());
        let index = &todos.iter().position(|t| t.id() == id);
        if let Some(index) = index {
            todos.remove(*index);
        }
    }
}
