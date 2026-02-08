import '../components/app-bar.js';
import '../components/note-input.js';
import '../components/note-list.js';
import '../components/note-item.js';
import '../components/app-loading.js';
import { showLoading, hideLoading } from './utils.js';
import Swal from 'sweetalert2'

function main() {
    const baseUrl = 'https://notes-api.dicoding.dev/v2';

    const noteListElement = document.querySelector('note-list');
    const noteInputElement = document.querySelector('note-input');
    const loadingElement = document.querySelector('app-loading');
    const filterButton = document.querySelector('#filter-button');

    let isShowingArchived = false;

    const getNotes = async () => {
        showLoading(loadingElement);
        try {
            const endpoint = isShowingArchived ? 'notes/archived' : 'notes';
            const response = await fetch(`${baseUrl}/${endpoint}`);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                noteListElement.notes = responseJson.data;
            }
        } catch (error) {
            showResponseMessage(error);
        } finally {
            hideLoading(loadingElement);
        }
    };

    const insertNote = async (note) => {
        showLoading(loadingElement);
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: note.title,
                    body: note.body
                }),
            };

            const response = await fetch(`${baseUrl}/notes`, options);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                if (isShowingArchived) {
                    isShowingArchived = false;
                    updateFilterButtonText();
                }
                getNotes();
            }
        } catch (error) {
            showResponseMessage(error);
        } finally {
            hideLoading(loadingElement);
        }
    };

    const removeNote = async (noteId) => {
        showLoading(loadingElement);
        try {
            const options = {
                method: 'DELETE',
            };

            const response = await fetch(`${baseUrl}/notes/${noteId}`, options);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                Swal.fire({
                    title: 'Note Deleted',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                getNotes();
            }
        } catch (error) {
            showResponseMessage(error);
        } finally {
            hideLoading(loadingElement);
        }
    };

    const toggleArchiveNote = async (noteId, currentStatus) => {
        showLoading(loadingElement);
        try {
            const endpoint = currentStatus ? `notes/${noteId}/unarchive` : `notes/${noteId}/archive`;
            const options = {
                method: 'POST',
            };

            const response = await fetch(`${baseUrl}/${endpoint}`, options);
            const responseJson = await response.json();

            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                getNotes();
            }
        } catch (error) {
            showResponseMessage(error);
        } finally {
            hideLoading(loadingElement);
        }
    };

    const updateFilterButtonText = () => {
        filterButton.textContent = isShowingArchived ? 'Unarchived Notes' : 'Archived Notes';
    };

    const showResponseMessage = () => {
        Swal.fire({
            title: 'Something went wrong',
            text: 'Check your internet connection',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateFilterButtonText();
        getNotes();
    });

    noteInputElement.addEventListener('note-submit', async (event) => {
        await insertNote(event.detail);
    });

    document.addEventListener('delete-note', async (event) => {
        await removeNote(event.detail);
    });

    document.addEventListener('toggle-archive', async (event) => {
        const { id, archived } = event.detail;
        await toggleArchiveNote(id, archived);
    });

    filterButton.addEventListener('click', () => {
        isShowingArchived = !isShowingArchived;
        updateFilterButtonText();
        getNotes();
    });

    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

export default main;