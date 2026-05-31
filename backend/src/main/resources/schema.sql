-- Create database
CREATE DATABASE IF NOT EXISTS algovista;
USE algovista;

-- Create algorithms table
CREATE TABLE IF NOT EXISTS algorithms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    category VARCHAR(100) NOT NULL
);

-- Create code_snippets table
CREATE TABLE IF NOT EXISTS code_snippets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    algorithm_id BIGINT NOT NULL,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    FOREIGN KEY (algorithm_id) REFERENCES algorithms(id)
);

-- Insert sample data for algorithms
INSERT INTO algorithms (name, description, time_complexity, space_complexity, category) VALUES
('Bubble Sort', 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.', 'O(n²)', 'O(1)', 'Sorting'),
('Selection Sort', 'Selection Sort is an in-place comparison sorting algorithm that divides the input list into a sorted and an unsorted region.', 'O(n²)', 'O(1)', 'Sorting'),
('Insertion Sort', 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.', 'O(n²)', 'O(1)', 'Sorting'),
('Merge Sort', 'Merge Sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.', 'O(n log n)', 'O(n)', 'Sorting'),
('Quick Sort', 'Quick Sort is a divide and conquer algorithm that selects a pivot element and partitions the array around the pivot.', 'O(n log n) average, O(n²) worst', 'O(log n)', 'Sorting'),
('Binary Search', 'Binary Search is a search algorithm that finds the position of a target value within a sorted array.', 'O(log n)', 'O(1)', 'Searching'),
('Array', 'Array is a collection of elements stored at contiguous memory locations.', 'N/A', 'N/A', 'Data Structure'),
('Linked List', 'Linked List is a linear data structure where elements are not stored at contiguous memory locations.', 'N/A', 'N/A', 'Data Structure'),
('Stack', 'Stack is a linear data structure which follows LIFO (Last In First Out) principle.', 'N/A', 'N/A', 'Data Structure'),
('Queue', 'Queue is a linear data structure which follows FIFO (First In First Out) principle.', 'N/A', 'N/A', 'Data Structure'),
('Binary Search Tree', 'Binary Search Tree is a tree data structure that allows fast lookup, addition, and removal of items.', 'N/A', 'N/A', 'Data Structure');

-- Insert sample data for code snippets
INSERT INTO code_snippets (algorithm_id, language, code) VALUES
(1, 'Java', 'public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }
}'),
(2, 'Java', 'public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            int min_idx = i;
            for (int j = i+1; j < n; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
}'),
(3, 'Java', 'public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}'),
(4, 'Java', 'public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = (l + r)/2;
            mergeSort(arr, l, m);
            mergeSort(arr, m+1, r);
            merge(arr, l, m, r);
        }
    }
    public static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int L[] = new int[n1];
        int R[] = new int[n2];
        for (int i=0; i<n1; ++i)
            L[i] = arr[l + i];
        for (int j=0; j<n2; ++j)
            R[j] = arr[m + 1+ j];
        int i = 0, j = 0;
        int k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
}'),
(5, 'Java', 'public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi-1);
            quickSort(arr, pi+1, high);
        }
    }
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low-1);
        for (int j=low; j<high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;
        return i+1;
    }
}'),
(6, 'Java', 'public class BinarySearch {
    public static int binarySearch(int[] arr, int x) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low)/2;
            if (arr[mid] == x)
                return mid;
            if (arr[mid] < x)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }
}');
