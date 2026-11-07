// Expanded Java reference library. Examples are concise teaching snippets; some require imports or surrounding classes.
const additionalJavaConcepts = [
  {
    "title": "Java program structure",
    "category": "Java basics",
    "tag": "Program entry point",
    "definition": "A Java application is commonly organized into classes. The JVM starts a standard application at public static void main(String[] args).",
    "syntax": "public class Main {\n    public static void main(String[] args) {\n        // statements\n    }\n}",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
    "output": "Hello, Java!",
    "note": "The public class name normally matches the file name, such as Main.java."
  },
  {
    "title": "Comments",
    "category": "Java basics",
    "tag": "Explain code",
    "definition": "Comments are notes for readers and are ignored by the compiler.",
    "syntax": "// one line\n/* multiple lines */\n/** documentation comment */",
    "example": "// Print a greeting\nSystem.out.println(\"Hi\");",
    "output": "Hi",
    "note": "Use comments to explain why code exists, not merely repeat what each line says."
  },
  {
    "title": "Constants with final",
    "category": "Java basics",
    "tag": "Unchanging reference/value",
    "definition": "The final keyword prevents reassignment of a variable after it has been assigned.",
    "syntax": "final double PI = 3.14159;",
    "example": "final int MAX_USERS = 100;\nSystem.out.println(MAX_USERS);",
    "output": "100",
    "note": "Constant names are conventionally uppercase with underscores."
  },
  {
    "title": "Type casting",
    "category": "Java basics",
    "tag": "Convert types",
    "definition": "Casting converts a value from one type to another. Widening is often automatic; narrowing may lose information and needs an explicit cast.",
    "syntax": "double d = 9.8;\nint n = (int) d;",
    "example": "double d = 9.8;\nint n = (int) d;\nSystem.out.println(n);",
    "output": "9",
    "note": "Casting a double to int truncates the fractional part; it does not round."
  },
  {
    "title": "var local-variable inference",
    "category": "Java basics",
    "tag": "Infer local type",
    "definition": "The var keyword lets Java infer a local variable type from its initializer; it is not dynamic typing.",
    "syntax": "var message = \"Hello\";",
    "example": "var count = 12;\nSystem.out.println(count);",
    "output": "12",
    "note": "Available since Java 10; only for local variables with an initializer."
  },
  {
    "title": "Wrapper classes",
    "category": "Java basics",
    "tag": "Object forms of primitives",
    "definition": "Wrapper classes represent primitive values as objects, for example Integer for int and Double for double.",
    "syntax": "Integer boxed = Integer.valueOf(42);\nint primitive = boxed;",
    "example": "Integer boxed = 42;\nSystem.out.println(boxed + 1);",
    "output": "43",
    "note": "Autoboxing and unboxing convert between primitive and wrapper values automatically."
  },
  {
    "title": "Integer parsing",
    "category": "Java basics",
    "tag": "Text to number",
    "definition": "Integer.parseInt converts a numeric String into an int and throws NumberFormatException for invalid text.",
    "syntax": "int value = Integer.parseInt(text);",
    "example": "int age = Integer.parseInt(\"18\");\nSystem.out.println(age + 1);",
    "output": "19",
    "note": "Validate user input or catch NumberFormatException when input may be invalid."
  },
  {
    "title": "String to double",
    "category": "Java basics",
    "tag": "Parse decimal",
    "definition": "Double.parseDouble converts a numeric String into a double.",
    "syntax": "double value = Double.parseDouble(text);",
    "example": "double price = Double.parseDouble(\"19.95\");\nSystem.out.println(price);",
    "output": "19.95",
    "note": "For money calculations, BigDecimal is usually preferable to binary floating-point."
  },
  {
    "title": "Unicode and char",
    "category": "Java basics",
    "tag": "Character data",
    "definition": "A char stores one UTF-16 code unit, not necessarily an entire Unicode character for all symbols.",
    "syntax": "char initial = 'J';",
    "example": "char initial = 'J';\nSystem.out.println(initial);",
    "output": "J",
    "note": "Some emoji and supplementary Unicode symbols require more than one char."
  },
  {
    "title": "Integer overflow",
    "category": "Java basics",
    "tag": "Numeric limits",
    "definition": "Integer types have fixed ranges. Arithmetic beyond a type range can wrap around rather than automatically report an error.",
    "syntax": "int n = Integer.MAX_VALUE;",
    "example": "int n = Integer.MAX_VALUE;\nSystem.out.println(n + 1);",
    "output": "-2147483648",
    "note": "Use long when a wider integer range is needed; check arithmetic for overflow in critical code."
  },
  {
    "title": "Operator precedence",
    "category": "Operators",
    "tag": "Order of evaluation",
    "definition": "Precedence determines which operators are grouped first. Parentheses make intended grouping clear.",
    "syntax": "int result = (a + b) * c;",
    "example": "System.out.println(2 + 3 * 4);\nSystem.out.println((2 + 3) * 4);",
    "output": "14\n20",
    "note": "Prefer parentheses when an expression may be difficult to read."
  },
  {
    "title": "Ternary operator",
    "category": "Operators",
    "tag": "Compact choice",
    "definition": "The conditional operator selects one of two expressions based on a boolean condition.",
    "syntax": "condition ? valueIfTrue : valueIfFalse",
    "example": "int age = 20;\nString label = age >= 18 ? \"Adult\" : \"Minor\";\nSystem.out.println(label);",
    "output": "Adult",
    "note": "For complex branching, ordinary if/else is clearer."
  },
  {
    "title": "Compound assignment",
    "category": "Operators",
    "tag": "Update variable",
    "definition": "Compound operators combine an operation with assignment.",
    "syntax": "x += 3;\nx *= 2;",
    "example": "int x = 4;\nx += 3;\nSystem.out.println(x);",
    "output": "7",
    "note": "Other examples include -=, /=, %=, &=, |= and ^=."
  },
  {
    "title": "Increment and decrement",
    "category": "Operators",
    "tag": "Change by one",
    "definition": "++ increments and -- decrements a numeric variable. Prefix and postfix differ in the value used inside a larger expression.",
    "syntax": "i++;\n--i;",
    "example": "int i = 4;\nSystem.out.println(i++);\nSystem.out.println(i);",
    "output": "4\n5",
    "note": "Prefer standalone increments when possible for readability."
  },
  {
    "title": "switch statement",
    "category": "Control flow",
    "tag": "Choose a branch",
    "definition": "A switch selects behavior based on a value such as an int, String, enum, or supported pattern.",
    "syntax": "switch (value) {\n    case 1 -> ...;\n    default -> ...;\n}",
    "example": "int day = 6;\nswitch (day) {\n    case 6, 7 -> System.out.println(\"Weekend\");\n    default -> System.out.println(\"Weekday\");\n}",
    "output": "Weekend",
    "note": "Arrow switch rules are available in modern Java; older syntax uses case labels and break."
  },
  {
    "title": "do-while loop",
    "category": "Control flow",
    "tag": "Run at least once",
    "definition": "A do-while loop checks its condition after executing the body, so it runs at least once.",
    "syntax": "do { ... } while (condition);",
    "example": "int n = 1;\ndo {\n    System.out.println(n);\n    n++;\n} while (n <= 2);",
    "output": "1\n2",
    "note": "Remember the semicolon after the while condition."
  },
  {
    "title": "break",
    "category": "Control flow",
    "tag": "Exit loop or switch",
    "definition": "break exits the nearest enclosing loop or switch statement.",
    "syntax": "break;",
    "example": "for (int i = 1; i <= 5; i++) {\n    if (i == 3) break;\n    System.out.println(i);\n}",
    "output": "1\n2",
    "note": "Labeled break can exit an outer labeled loop, but use sparingly."
  },
  {
    "title": "continue",
    "category": "Control flow",
    "tag": "Skip iteration",
    "definition": "continue skips the rest of the current loop iteration and moves to the next one.",
    "syntax": "continue;",
    "example": "for (int i = 1; i <= 4; i++) {\n    if (i == 2) continue;\n    System.out.println(i);\n}",
    "output": "1\n3\n4",
    "note": "Make sure loop updates still occur as intended."
  },
  {
    "title": "Enhanced for loop",
    "category": "Control flow",
    "tag": "Iterate elements",
    "definition": "The enhanced for loop visits each element in an array or Iterable collection.",
    "syntax": "for (Type item : collection) { ... }",
    "example": "int[] nums = {2, 4, 6};\nfor (int n : nums) System.out.println(n);",
    "output": "2\n4\n6",
    "note": "Use an indexed loop when you need the index or need to replace array elements by index."
  },
  {
    "title": "Scope",
    "category": "Java basics",
    "tag": "Where a name exists",
    "definition": "Scope is the region of code where a variable or name can be accessed.",
    "syntax": "{\n    int local = 3;\n}",
    "example": "if (true) {\n    int local = 3;\n    System.out.println(local);\n}",
    "output": "3",
    "note": "A local variable cannot be used outside the block in which it is declared."
  },
  {
    "title": "Method overloading",
    "category": "Methods",
    "tag": "Same name, different parameters",
    "definition": "Overloading defines multiple methods with the same name but different parameter lists.",
    "syntax": "int add(int a, int b)\ndouble add(double a, double b)",
    "example": "static int add(int a, int b) { return a + b; }\nSystem.out.println(add(2, 3));",
    "output": "5",
    "note": "Changing only the return type does not create a valid overload."
  },
  {
    "title": "Varargs",
    "category": "Methods",
    "tag": "Variable argument count",
    "definition": "Varargs allow a method to accept zero or more arguments of one declared type.",
    "syntax": "static int sum(int... values) { ... }",
    "example": "static int sum(int... values) {\n    int total = 0;\n    for (int v : values) total += v;\n    return total;\n}\nSystem.out.println(sum(1, 2, 3));",
    "output": "6",
    "note": "A varargs parameter must be the final parameter in a method declaration."
  },
  {
    "title": "Recursion",
    "category": "Methods",
    "tag": "Method calls itself",
    "definition": "A recursive method solves a problem by calling itself with a smaller problem and needs a base case.",
    "syntax": "if (baseCase) return value;\nreturn method(smallerInput);",
    "example": "static int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nSystem.out.println(factorial(5));",
    "output": "120",
    "note": "Deep recursion can cause StackOverflowError; iteration may be safer for large inputs."
  },
  {
    "title": "Pass-by-value",
    "category": "Methods",
    "tag": "How arguments are passed",
    "definition": "Java always passes arguments by value. For objects, the copied value is a reference to the same object.",
    "syntax": "method(variable);",
    "example": "static void change(int x) { x = 99; }\nint n = 5;\nchange(n);\nSystem.out.println(n);",
    "output": "5",
    "note": "A method can mutate a referenced object, but reassigning its parameter does not reassign the caller variable."
  },
  {
    "title": "Encapsulation",
    "category": "OOP",
    "tag": "Protect object state",
    "definition": "Encapsulation keeps implementation details inside a class and exposes controlled operations through methods.",
    "syntax": "private int age;\npublic int getAge() { return age; }",
    "example": "class Counter {\n    private int value;\n    public void increment() { value++; }\n    public int getValue() { return value; }\n}",
    "output": "Use methods to validate changes",
    "note": "Prefer private fields unless there is a clear reason to expose them."
  },
  {
    "title": "Abstraction",
    "category": "OOP",
    "tag": "Expose essentials",
    "definition": "Abstraction describes what an object can do while hiding unnecessary implementation details.",
    "syntax": "abstract class Shape {\n    abstract double area();\n}",
    "example": "abstract class Shape { abstract double area(); }",
    "output": "Shape defines an area contract",
    "note": "Interfaces and abstract classes are common tools for abstraction."
  },
  {
    "title": "Polymorphism",
    "category": "OOP",
    "tag": "One interface, many forms",
    "definition": "Polymorphism allows a parent type or interface reference to refer to different implementation objects.",
    "syntax": "Shape s = new Circle();\ns.area();",
    "example": "interface Shape { double area(); }\nclass Circle implements Shape { public double area() { return 3.14; } }\nShape s = new Circle();\nSystem.out.println(s.area());",
    "output": "3.14",
    "note": "Overridden instance methods are selected at runtime based on the actual object."
  },
  {
    "title": "Method overriding",
    "category": "OOP",
    "tag": "Replace inherited behavior",
    "definition": "A subclass overrides an inherited instance method with a compatible signature.",
    "syntax": "@Override\npublic String toString() { ... }",
    "example": "class Animal { void speak() { System.out.println(\"...\"); } }\nclass Dog extends Animal { @Override void speak() { System.out.println(\"Woof\"); } }\nnew Dog().speak();",
    "output": "Woof",
    "note": "Use @Override so the compiler can catch signature mistakes."
  },
  {
    "title": "this keyword",
    "category": "OOP",
    "tag": "Current object",
    "definition": "this refers to the current instance and can distinguish fields from parameters.",
    "syntax": "this.name = name;",
    "example": "class Student {\n    String name;\n    Student(String name) { this.name = name; }\n}",
    "output": "Assigns parameter to field",
    "note": "this(...) can call another constructor in the same class."
  },
  {
    "title": "super keyword",
    "category": "OOP",
    "tag": "Parent implementation",
    "definition": "super accesses parent-class constructors or members.",
    "syntax": "super(name);\nsuper.toString();",
    "example": "class Animal { Animal(String n) {} }\nclass Dog extends Animal { Dog() { super(\"Dog\"); } }",
    "output": "Parent constructor is called",
    "note": "A super(...) constructor call must be first in the constructor body."
  },
  {
    "title": "Access modifiers",
    "category": "OOP",
    "tag": "Control visibility",
    "definition": "public is broadly accessible; protected allows package access and subclass access; package-private has no modifier; private restricts access to the declaring class.",
    "syntax": "public / protected / (default) / private",
    "example": "class Account {\n    private double balance;\n    public double getBalance() { return balance; }\n}",
    "output": "Fields remain private; getter is public",
    "note": "Top-level classes can be public or package-private, not private or protected."
  },
  {
    "title": "static members",
    "category": "OOP",
    "tag": "Belong to class",
    "definition": "A static field or method belongs to the class rather than one particular object.",
    "syntax": "static int count;\nstatic void printCount() { ... }",
    "example": "class Counter { static int count = 0; }\nCounter.count++;\nSystem.out.println(Counter.count);",
    "output": "1",
    "note": "Call static members through the class name when practical."
  },
  {
    "title": "final class and method",
    "category": "OOP",
    "tag": "Prevent extension/override",
    "definition": "A final class cannot be subclassed and a final method cannot be overridden.",
    "syntax": "final class Utility { }\nfinal void run() { }",
    "example": "final class Constants { }",
    "output": "Class cannot be extended",
    "note": "final on a variable prevents reassignment; on a method/class it has different effects."
  },
  {
    "title": "Abstract class",
    "category": "OOP",
    "tag": "Partial class contract",
    "definition": "An abstract class cannot be instantiated directly and may declare abstract methods for subclasses to implement.",
    "syntax": "abstract class Animal {\n    abstract void sound();\n}",
    "example": "abstract class Animal { abstract void sound(); }\nclass Cat extends Animal { void sound() { System.out.println(\"Meow\"); } }\nnew Cat().sound();",
    "output": "Meow",
    "note": "An abstract class can also have fields, constructors, and implemented methods."
  },
  {
    "title": "Interface",
    "category": "OOP",
    "tag": "Behavior contract",
    "definition": "An interface declares a contract that classes can implement. Interfaces can also contain default, static, and private methods under supported Java versions.",
    "syntax": "interface Printable { void print(); }",
    "example": "interface Printable { void print(); }\nclass Report implements Printable { public void print() { System.out.println(\"Report\"); } }\nnew Report().print();",
    "output": "Report",
    "note": "A class can implement multiple interfaces."
  },
  {
    "title": "enum",
    "category": "OOP",
    "tag": "Fixed set of constants",
    "definition": "An enum defines a type with a fixed set of named constants.",
    "syntax": "enum Level { LOW, MEDIUM, HIGH }",
    "example": "enum Level { LOW, MEDIUM, HIGH }\nLevel level = Level.HIGH;\nSystem.out.println(level);",
    "output": "HIGH",
    "note": "Enums can have fields, constructors, and methods."
  },
  {
    "title": "record",
    "category": "OOP",
    "tag": "Data carrier class",
    "definition": "A record is a concise way to model data with a fixed set of components.",
    "syntax": "record Point(int x, int y) { }",
    "example": "record Point(int x, int y) { }\nPoint p = new Point(2, 5);\nSystem.out.println(p.x() + \",\" + p.y());",
    "output": "2,5",
    "note": "Records became a permanent feature in Java 16; component accessors use method calls such as x()."
  },
  {
    "title": "Object.equals and hashCode",
    "category": "OOP",
    "tag": "Logical equality",
    "definition": "equals defines logical equality, while hashCode supports hash-based collections. Equal objects must have equal hash codes.",
    "syntax": "@Override public boolean equals(Object o) { ... }\n@Override public int hashCode() { ... }",
    "example": "String a = new String(\"Java\");\nString b = new String(\"Java\");\nSystem.out.println(a.equals(b));",
    "output": "true",
    "note": "When overriding equals, also override hashCode and follow the contracts."
  },
  {
    "title": "Composition",
    "category": "OOP",
    "tag": "Has-a relationship",
    "definition": "Composition models an object containing or using other objects instead of relying on inheritance.",
    "syntax": "class Car { private Engine engine; }",
    "example": "class Engine { }\nclass Car { private final Engine engine = new Engine(); }",
    "output": "Car has an Engine",
    "note": "Favor composition over inheritance when the relationship is has-a rather than is-a."
  },
  {
    "title": "StringBuilder",
    "category": "Strings",
    "tag": "Efficient text building",
    "definition": "StringBuilder builds mutable text efficiently when many concatenations are needed in a loop.",
    "syntax": "StringBuilder sb = new StringBuilder();\nsb.append(value);",
    "example": "StringBuilder sb = new StringBuilder();\nsb.append(\"Java\").append(\"Verse\");\nSystem.out.println(sb);",
    "output": "JavaVerse",
    "note": "StringBuilder is not synchronized; StringBuffer offers synchronized methods for legacy thread-safe use."
  },
  {
    "title": "String formatting",
    "category": "Strings",
    "tag": "Format output",
    "definition": "String.format and printf use format specifiers to control how values are displayed.",
    "syntax": "System.out.printf(\"%.2f\", value);",
    "example": "double price = 3.5;\nSystem.out.printf(\"%.2f%n\", price);",
    "output": "3.50",
    "note": "Common specifiers include %s, %d, %f, %c, and %n."
  },
  {
    "title": "String split",
    "category": "Strings",
    "tag": "Divide text",
    "definition": "split uses a regular expression to split a string into pieces.",
    "syntax": "String[] parts = text.split(\",\");",
    "example": "String[] parts = \"red,green,blue\".split(\",\");\nSystem.out.println(parts[1]);",
    "output": "green",
    "note": "Some characters, such as a dot, have special meaning in regex and need escaping."
  },
  {
    "title": "String contains and startsWith",
    "category": "Strings",
    "tag": "Search text",
    "definition": "These methods test whether text contains a sequence or begins with a prefix.",
    "syntax": "text.contains(\"Java\")\ntext.startsWith(\"J\")",
    "example": "String text = \"JavaVerse\";\nSystem.out.println(text.contains(\"Verse\"));",
    "output": "true",
    "note": "String matching is case-sensitive unless you normalize the text first."
  },
  {
    "title": "String substring",
    "category": "Strings",
    "tag": "Extract text",
    "definition": "substring returns a portion of a string from a start index to an optional end index, excluding the end index.",
    "syntax": "text.substring(beginIndex, endIndex)",
    "example": "String text = \"JavaVerse\";\nSystem.out.println(text.substring(0, 4));",
    "output": "Java",
    "note": "Indexes start at zero and invalid ranges throw StringIndexOutOfBoundsException."
  },
  {
    "title": "Arrays utility",
    "category": "Arrays & collections",
    "tag": "Sort and inspect arrays",
    "definition": "java.util.Arrays contains static helper methods for sorting, searching, comparing, and printing arrays.",
    "syntax": "Arrays.sort(values);\nArrays.toString(values)",
    "example": "int[] a = {3, 1, 2};\nArrays.sort(a);\nSystem.out.println(Arrays.toString(a));",
    "output": "[1, 2, 3]",
    "note": "Import java.util.Arrays."
  },
  {
    "title": "Two-dimensional arrays",
    "category": "Arrays & collections",
    "tag": "Rows and columns",
    "definition": "A two-dimensional array is an array whose elements are themselves arrays.",
    "syntax": "int[][] grid = new int[rows][cols];",
    "example": "int[][] grid = {{1, 2}, {3, 4}};\nSystem.out.println(grid[1][0]);",
    "output": "3",
    "note": "Java also permits rows of different lengths in a jagged array."
  },
  {
    "title": "List interface",
    "category": "Collections",
    "tag": "Ordered collection",
    "definition": "List represents an ordered collection that allows indexed access and may contain duplicates.",
    "syntax": "List<String> names = new ArrayList<>();",
    "example": "List<String> names = new ArrayList<>();\nnames.add(\"Mia\");\nnames.add(\"Noah\");\nSystem.out.println(names.size());",
    "output": "2",
    "note": "Program to the List interface where possible."
  },
  {
    "title": "Set interface",
    "category": "Collections",
    "tag": "Unique elements",
    "definition": "Set represents a collection that does not contain duplicate elements.",
    "syntax": "Set<String> tags = new HashSet<>();",
    "example": "Set<String> tags = new HashSet<>();\ntags.add(\"java\");\ntags.add(\"java\");\nSystem.out.println(tags.size());",
    "output": "1",
    "note": "HashSet does not guarantee iteration order; LinkedHashSet preserves insertion order."
  },
  {
    "title": "Map interface",
    "category": "Collections",
    "tag": "Key-value pairs",
    "definition": "Map stores mappings from unique keys to values.",
    "syntax": "Map<String, Integer> scores = new HashMap<>();",
    "example": "Map<String, Integer> scores = new HashMap<>();\nscores.put(\"Ana\", 95);\nSystem.out.println(scores.get(\"Ana\"));",
    "output": "95",
    "note": "Use containsKey to test for a key; get may return null when no mapping exists."
  },
  {
    "title": "Queue and Deque",
    "category": "Collections",
    "tag": "Processing order",
    "definition": "Queue models elements waiting to be processed; Deque supports adding/removing at both ends.",
    "syntax": "Queue<String> q = new ArrayDeque<>();",
    "example": "Queue<String> q = new ArrayDeque<>();\nq.offer(\"first\");\nq.offer(\"second\");\nSystem.out.println(q.poll());",
    "output": "first",
    "note": "Use offer, poll, and peek when you want non-throwing queue operations."
  },
  {
    "title": "HashMap vs TreeMap",
    "category": "Collections",
    "tag": "Map implementation choices",
    "definition": "HashMap is generally designed for fast key lookup without sorted order; TreeMap maintains keys in sorted order.",
    "syntax": "Map<String,Integer> a = new HashMap<>();\nMap<String,Integer> b = new TreeMap<>();",
    "example": "Map<String,Integer> map = new TreeMap<>();\nmap.put(\"B\", 2); map.put(\"A\", 1);\nSystem.out.println(map.keySet());",
    "output": "[A, B]",
    "note": "Performance and ordering requirements should guide the choice."
  },
  {
    "title": "Iterator",
    "category": "Collections",
    "tag": "Walk through a collection",
    "definition": "Iterator visits elements and can safely remove elements through its remove method when supported.",
    "syntax": "Iterator<Type> it = items.iterator();",
    "example": "List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\nIterator<String> it = items.iterator();\nwhile (it.hasNext()) System.out.println(it.next());",
    "output": "a\nb",
    "note": "Import java.util.Iterator; avoid modifying a collection structurally during enhanced-for iteration."
  },
  {
    "title": "Collections utility",
    "category": "Collections",
    "tag": "Collection algorithms",
    "definition": "java.util.Collections provides algorithms and wrappers for collections, such as sorting, reversing, and unmodifiable views.",
    "syntax": "Collections.sort(list);\nCollections.reverse(list);",
    "example": "List<Integer> n = new ArrayList<>(List.of(3, 1, 2));\nCollections.sort(n);\nSystem.out.println(n);",
    "output": "[1, 2, 3]",
    "note": "Arrays and Collections are different utility classes."
  },
  {
    "title": "Comparable",
    "category": "Collections",
    "tag": "Natural ordering",
    "definition": "Comparable lets a class define its natural ordering through compareTo.",
    "syntax": "class Student implements Comparable<Student> { ... }",
    "example": "List<Integer> n = new ArrayList<>(List.of(9, 2, 5));\nCollections.sort(n);\nSystem.out.println(n);",
    "output": "[2, 5, 9]",
    "note": "compareTo should be consistent and return negative, zero, or positive based on ordering."
  },
  {
    "title": "Comparator",
    "category": "Collections",
    "tag": "Custom ordering",
    "definition": "Comparator defines an external comparison rule, useful for sorting by different fields.",
    "syntax": "Comparator.comparing(Person::name)",
    "example": "List<String> names = new ArrayList<>(List.of(\"Zoe\", \"Ana\"));\nnames.sort(Comparator.naturalOrder());\nSystem.out.println(names);",
    "output": "[Ana, Zoe]",
    "note": "Use Comparator.comparing(...) to sort objects by a selected property."
  },
  {
    "title": "Generics",
    "category": "Generics",
    "tag": "Type-safe reusable code",
    "definition": "Generics let classes, interfaces, and methods operate on types while preserving compile-time type checks.",
    "syntax": "List<String> names = new ArrayList<>();",
    "example": "List<String> names = new ArrayList<>();\nnames.add(\"Java\");\nString first = names.get(0);\nSystem.out.println(first);",
    "output": "Java",
    "note": "Generic type arguments cannot be primitive types; use Integer instead of int."
  },
  {
    "title": "Generic bounded type",
    "category": "Generics",
    "tag": "Restrict generic type",
    "definition": "A bound such as T extends Number restricts a type parameter to Number or its subclasses.",
    "syntax": "static <T extends Number> double value(T n)",
    "example": "static <T extends Number> double value(T n) { return n.doubleValue(); }\nSystem.out.println(value(12));",
    "output": "12.0",
    "note": "extends is used for both class and interface bounds in generic declarations."
  },
  {
    "title": "Wildcard generics",
    "category": "Generics",
    "tag": "Flexible generic APIs",
    "definition": "Wildcards allow methods to accept parameterized types with flexible bounds.",
    "syntax": "List<? extends Number> values",
    "example": "static double sum(List<? extends Number> xs) {\n    double total = 0;\n    for (Number n : xs) total += n.doubleValue();\n    return total;\n}",
    "output": "Adds numeric list values",
    "note": "PECS mnemonic: Producer Extends, Consumer Super, for common API design situations."
  },
  {
    "title": "try-catch",
    "category": "Exceptions",
    "tag": "Handle failures",
    "definition": "try-catch handles exceptions that occur in a protected block so the program can respond appropriately.",
    "syntax": "try { ... } catch (ExceptionType e) { ... }",
    "example": "try {\n    int n = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n    System.out.println(\"Not a number\");\n}",
    "output": "Not a number",
    "note": "Catch specific exceptions where possible rather than catching Exception indiscriminately."
  },
  {
    "title": "finally",
    "category": "Exceptions",
    "tag": "Cleanup block",
    "definition": "A finally block generally runs after try/catch finishes, whether or not an exception occurred.",
    "syntax": "try { ... } finally { ... }",
    "example": "try {\n    System.out.println(\"Work\");\n} finally {\n    System.out.println(\"Cleanup\");\n}",
    "output": "Work\nCleanup",
    "note": "For AutoCloseable resources, try-with-resources is usually preferred."
  },
  {
    "title": "throw and throws",
    "category": "Exceptions",
    "tag": "Raise or declare exceptions",
    "definition": "throw actually throws an exception object; throws declares exceptions a method may pass to its caller.",
    "syntax": "throw new IllegalArgumentException(\"message\");\nvoid read() throws IOException",
    "example": "static void checkAge(int age) {\n    if (age < 0) throw new IllegalArgumentException(\"age\");\n}\ncheckAge(-1);",
    "output": "Throws IllegalArgumentException",
    "note": "Checked exceptions must be caught or declared; unchecked exceptions do not have that requirement."
  },
  {
    "title": "Custom exception",
    "category": "Exceptions",
    "tag": "Domain-specific failure",
    "definition": "A custom exception names a failure specific to an application.",
    "syntax": "class InvalidScoreException extends Exception { ... }",
    "example": "class InvalidScoreException extends Exception {\n    InvalidScoreException(String message) { super(message); }\n}",
    "output": "Define a meaningful exception type",
    "note": "Extend Exception for checked exceptions or RuntimeException for unchecked exceptions."
  },
  {
    "title": "try-with-resources",
    "category": "Exceptions",
    "tag": "Close resources automatically",
    "definition": "Try-with-resources closes AutoCloseable resources at the end of the statement, including when exceptions occur.",
    "syntax": "try (BufferedReader br = Files.newBufferedReader(path)) { ... }",
    "example": "try (Scanner sc = new Scanner(\"hello\")) {\n    System.out.println(sc.next());\n}",
    "output": "hello",
    "note": "Resources are closed automatically in reverse order of declaration."
  },
  {
    "title": "File and Path",
    "category": "Files",
    "tag": "Represent file locations",
    "definition": "Path represents a filesystem path; Files provides static methods to read, write, copy, and inspect files.",
    "syntax": "Path path = Path.of(\"notes.txt\");",
    "example": "Path path = Path.of(\"notes.txt\");\nSystem.out.println(path.getFileName());",
    "output": "notes.txt",
    "note": "Modern file APIs are in java.nio.file."
  },
  {
    "title": "Read text file",
    "category": "Files",
    "tag": "Load file contents",
    "definition": "Files.readString reads a file into a String on supported Java versions.",
    "syntax": "String text = Files.readString(path);",
    "example": "Path p = Path.of(\"notes.txt\");\n// String text = Files.readString(p);",
    "output": "Reads the file text",
    "note": "This example needs an existing file and handling for IOException; available since Java 11."
  },
  {
    "title": "Write text file",
    "category": "Files",
    "tag": "Save text",
    "definition": "Files.writeString writes a String to a file on supported Java versions.",
    "syntax": "Files.writeString(path, text);",
    "example": "Path p = Path.of(\"notes.txt\");\n// Files.writeString(p, \"Hello\");",
    "output": "Writes Hello to notes.txt",
    "note": "This example needs appropriate permissions and IOException handling; available since Java 11."
  },
  {
    "title": "BufferedReader",
    "category": "Files",
    "tag": "Read text efficiently",
    "definition": "BufferedReader reads text efficiently and can read complete lines using readLine.",
    "syntax": "try (BufferedReader br = Files.newBufferedReader(path)) { ... }",
    "example": "try (BufferedReader br = new BufferedReader(new StringReader(\"Java\\nVerse\"))) {\n    System.out.println(br.readLine());\n} catch (IOException e) { }",
    "output": "Java",
    "note": "Use try-with-resources to close readers."
  },
  {
    "title": "Serialization warning",
    "category": "Files",
    "tag": "Persist object data",
    "definition": "Java serialization can write object graphs, but deserializing untrusted data is dangerous and modern applications often prefer explicit formats.",
    "syntax": "ObjectOutputStream / ObjectInputStream",
    "example": "// Prefer JSON or another explicit data format for many application needs.",
    "output": "Use a documented data format",
    "note": "Do not deserialize untrusted bytes; serialization has security and compatibility risks."
  },
  {
    "title": "Lambda expression",
    "category": "Functional Java",
    "tag": "Pass behavior",
    "definition": "A lambda is a concise implementation of a functional interface method.",
    "syntax": "(parameters) -> expression",
    "example": "List<String> names = List.of(\"Ana\", \"Ben\");\nnames.forEach(name -> System.out.println(name));",
    "output": "Ana\nBen",
    "note": "Lambdas are commonly used with collections, callbacks, and streams."
  },
  {
    "title": "Functional interface",
    "category": "Functional Java",
    "tag": "One abstract method",
    "definition": "A functional interface has one abstract method and can be implemented by a lambda expression.",
    "syntax": "@FunctionalInterface\ninterface Action { void run(); }",
    "example": "Runnable task = () -> System.out.println(\"Running\");\ntask.run();",
    "output": "Running",
    "note": "Default and static methods do not count as abstract methods for this purpose."
  },
  {
    "title": "Method reference",
    "category": "Functional Java",
    "tag": "Refer to existing method",
    "definition": "A method reference is a compact alternative to a lambda that calls an existing method.",
    "syntax": "System.out::println",
    "example": "List.of(\"Java\", \"SQL\").forEach(System.out::println);",
    "output": "Java\nSQL",
    "note": "Common forms include ClassName::staticMethod and object::instanceMethod."
  },
  {
    "title": "Stream filter and map",
    "category": "Streams",
    "tag": "Transform collections",
    "definition": "Streams describe a pipeline of operations; filter selects elements and map transforms them.",
    "syntax": "stream().filter(...).map(...).toList()",
    "example": "List<Integer> nums = List.of(1, 2, 3, 4);\nList<Integer> out = nums.stream().filter(n -> n % 2 == 0).map(n -> n * n).toList();\nSystem.out.println(out);",
    "output": "[4, 16]",
    "note": "Stream.toList() is available since Java 16; older Java versions can use Collectors.toList()."
  },
  {
    "title": "Stream reduce",
    "category": "Streams",
    "tag": "Combine values",
    "definition": "reduce combines stream elements into one result, such as a sum.",
    "syntax": "stream.reduce(identity, accumulator)",
    "example": "int sum = List.of(1, 2, 3).stream().reduce(0, Integer::sum);\nSystem.out.println(sum);",
    "output": "6",
    "note": "For primitive numeric streams, mapToInt(...).sum() can be simpler."
  },
  {
    "title": "Optional",
    "category": "Functional Java",
    "tag": "Represent possible absence",
    "definition": "Optional is a container that may or may not hold a non-null value and can make absence explicit in APIs.",
    "syntax": "Optional<String> name = Optional.of(\"Ana\");",
    "example": "Optional<String> name = Optional.of(\"Ana\");\nSystem.out.println(name.orElse(\"Guest\"));",
    "output": "Ana",
    "note": "Avoid using Optional as a replacement for every nullable field or method parameter."
  },
  {
    "title": "Date and time API",
    "category": "Date & time",
    "tag": "Modern date/time types",
    "definition": "java.time provides immutable types such as LocalDate, LocalTime, LocalDateTime, Instant, and ZonedDateTime.",
    "syntax": "LocalDate today = LocalDate.now();",
    "example": "LocalDate date = LocalDate.of(2026, 11, 7);\nSystem.out.println(date.getYear());",
    "output": "2026",
    "note": "Use Instant for a point on the UTC timeline and ZonedDateTime for time-zone-aware date/time."
  },
  {
    "title": "Date formatting",
    "category": "Date & time",
    "tag": "Format date/time",
    "definition": "DateTimeFormatter parses and formats java.time values.",
    "syntax": "DateTimeFormatter.ofPattern(\"yyyy-MM-dd\")",
    "example": "LocalDate d = LocalDate.of(2026, 11, 7);\nSystem.out.println(d.format(DateTimeFormatter.ISO_DATE));",
    "output": "2026-11-07",
    "note": "Patterns are case-sensitive: MM is month, mm is minute."
  },
  {
    "title": "Regular expressions",
    "category": "Text processing",
    "tag": "Pattern matching",
    "definition": "Regular expressions describe text patterns and can be used with String methods or Pattern and Matcher.",
    "syntax": "text.matches(\"\\\\d+\")",
    "example": "System.out.println(\"12345\".matches(\"\\\\d+\"));",
    "output": "true",
    "note": "In Java string literals, backslashes are escaped, so regex \\d is written as \"\\\\d\"."
  },
  {
    "title": "JDK, JRE, JVM",
    "category": "Java platform",
    "tag": "Tools and runtime",
    "definition": "The JVM executes Java bytecode; the runtime includes components needed to run programs; the JDK includes development tools such as the compiler.",
    "syntax": "javac Main.java\njava Main",
    "example": "// Compile Main.java, then run Main from a terminal.",
    "output": "Compile, then run",
    "note": "Modern distributions commonly package runtime and development tools in JDK installations."
  },
  {
    "title": "Compilation and bytecode",
    "category": "Java platform",
    "tag": "Source to execution",
    "definition": "javac compiles Java source code into class files containing bytecode that a JVM can execute.",
    "syntax": "javac Main.java\njava Main",
    "example": "// Main.java -> Main.class -> JVM execution",
    "output": "Bytecode runs on compatible JVMs",
    "note": "Java is commonly described as compiled to bytecode and executed by a JVM with interpretation/JIT compilation."
  },
  {
    "title": "Packages and imports",
    "category": "Java basics",
    "tag": "Organize classes",
    "definition": "Packages group related types and help control naming. Imports let code refer to types without fully qualified names.",
    "syntax": "package com.example;\nimport java.util.List;",
    "example": "import java.util.List;\nList<String> names = List.of(\"Java\");\nSystem.out.println(names);",
    "output": "[Java]",
    "note": "Package declarations, when present, appear before imports and type declarations."
  },
  {
    "title": "Annotations",
    "category": "Java platform",
    "tag": "Attach metadata",
    "definition": "Annotations provide metadata to compilers, tools, or runtime frameworks.",
    "syntax": "@Override\n@Deprecated\n@SuppressWarnings(\"unchecked\")",
    "example": "@Override\npublic String toString() { return \"Demo\"; }",
    "output": "Compiler checks override",
    "note": "An annotation only has an effect when the compiler or a tool/runtime interprets it."
  },
  {
    "title": "Reflection",
    "category": "Advanced Java",
    "tag": "Inspect types at runtime",
    "definition": "Reflection allows code to inspect classes, fields, methods, and constructors at runtime.",
    "syntax": "Class<?> type = String.class;",
    "example": "System.out.println(String.class.getSimpleName());",
    "output": "String",
    "note": "Reflection can reduce compile-time guarantees and may be restricted by module/access rules."
  },
  {
    "title": "ClassLoader",
    "category": "JVM internals",
    "tag": "Load classes",
    "definition": "Class loaders locate and load class definitions into the JVM at runtime.",
    "syntax": "ClassLoader loader = MyClass.class.getClassLoader();",
    "example": "System.out.println(String.class.getName());",
    "output": "java.lang.String",
    "note": "The bootstrap loader loads core classes; custom class loaders are used by some frameworks and containers."
  },
  {
    "title": "Garbage collection",
    "category": "JVM internals",
    "tag": "Reclaim unused memory",
    "definition": "The JVM garbage collector reclaims heap memory occupied by objects that are no longer reachable.",
    "syntax": "Object obj = new Object();",
    "example": "Object obj = new Object();\nobj = null; // object may become eligible for collection",
    "output": "No guaranteed immediate output",
    "note": "Do not rely on System.gc() to run collection immediately or use finalization for resource cleanup."
  },
  {
    "title": "Stack and heap",
    "category": "JVM internals",
    "tag": "Memory concepts",
    "definition": "The stack stores per-thread frames for method calls and local state; the heap holds objects and arrays. This is a conceptual model of JVM memory.",
    "syntax": "int local = 3;\nObject object = new Object();",
    "example": "int local = 3;\nObject object = new Object();",
    "output": "Local primitive and object reference; object allocated on heap",
    "note": "Actual memory behavior depends on JVM implementation and optimization."
  },
  {
    "title": "Threads",
    "category": "Concurrency",
    "tag": "Run tasks concurrently",
    "definition": "A thread is an execution path within a process. Java supports creating threads and higher-level concurrency APIs.",
    "syntax": "new Thread(() -> work()).start();",
    "example": "Thread t = new Thread(() -> System.out.println(\"Hello from thread\"));\nt.start();\nt.join();",
    "output": "Hello from thread",
    "note": "In production, ExecutorService is often preferable to creating many threads manually."
  },
  {
    "title": "synchronized",
    "category": "Concurrency",
    "tag": "Coordinate shared access",
    "definition": "synchronized uses an intrinsic monitor to provide mutual exclusion and memory visibility for protected operations.",
    "syntax": "synchronized (lock) { ... }",
    "example": "class Counter {\n    private int value;\n    synchronized void increment() { value++; }\n    synchronized int get() { return value; }\n}",
    "output": "Protects access to value",
    "note": "Synchronization must be designed carefully to avoid races and deadlocks."
  },
  {
    "title": "volatile",
    "category": "Concurrency",
    "tag": "Visibility for a field",
    "definition": "volatile makes writes to a variable visible to other threads under Java memory-model rules, but does not make compound operations atomic.",
    "syntax": "private volatile boolean running = true;",
    "example": "volatile boolean ready = false; // visibility flag example",
    "output": "Other threads can observe updates",
    "note": "volatile count++ is not an atomic increment; consider AtomicInteger for that use case."
  },
  {
    "title": "ExecutorService",
    "category": "Concurrency",
    "tag": "Manage task execution",
    "definition": "ExecutorService manages task submission and execution using a pool or other execution policy.",
    "syntax": "ExecutorService pool = Executors.newFixedThreadPool(4);",
    "example": "try (var pool = Executors.newSingleThreadExecutor()) {\n    var future = pool.submit(() -> 2 + 3);\n    System.out.println(future.get());\n}",
    "output": "5",
    "note": "ExecutorService lifecycle methods vary by Java version; close support is available in newer Java releases."
  },
  {
    "title": "CompletableFuture",
    "category": "Concurrency",
    "tag": "Compose asynchronous work",
    "definition": "CompletableFuture represents a future result and supports composing asynchronous actions.",
    "syntax": "CompletableFuture.supplyAsync(() -> value)",
    "example": "CompletableFuture<Integer> f = CompletableFuture.supplyAsync(() -> 2 + 3);\nSystem.out.println(f.join());",
    "output": "5",
    "note": "Handle exceptions and choose executors deliberately in real applications."
  },
  {
    "title": "Socket networking",
    "category": "Networking",
    "tag": "TCP communication",
    "definition": "Socket APIs let Java programs communicate over network connections, often using TCP.",
    "syntax": "Socket socket = new Socket(host, port);",
    "example": "// Use Socket with an explicit host, port, and try-with-resources.",
    "output": "Network connection",
    "note": "Network code needs timeouts, error handling, and careful treatment of untrusted data."
  },
  {
    "title": "HttpClient",
    "category": "Networking",
    "tag": "Send HTTP requests",
    "definition": "java.net.http.HttpClient provides APIs for sending HTTP requests and receiving responses.",
    "syntax": "HttpClient.newHttpClient()",
    "example": "HttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder(URI.create(\"https://example.com\")).GET().build();\n// HttpResponse<String> response = client.send(request, BodyHandlers.ofString());",
    "output": "Builds an HTTP GET request",
    "note": "Sending the request requires handling IOException and InterruptedException; available since Java 11."
  },
  {
    "title": "JDBC",
    "category": "Databases",
    "tag": "Connect to SQL databases",
    "definition": "JDBC is Java’s standard API for connecting to relational databases and executing SQL.",
    "syntax": "Connection / PreparedStatement / ResultSet",
    "example": "// Use PreparedStatement with ? placeholders for values.",
    "output": "Query results depend on database",
    "note": "Use try-with-resources and parameterized statements; never concatenate untrusted input into SQL."
  },
  {
    "title": "PreparedStatement",
    "category": "Databases",
    "tag": "Parameterized SQL",
    "definition": "PreparedStatement binds parameter values separately from SQL text, helping prevent SQL injection and improving query clarity.",
    "syntax": "SELECT * FROM users WHERE email = ?",
    "example": "PreparedStatement ps = connection.prepareStatement(\"SELECT id FROM users WHERE email = ?\");\nps.setString(1, email);",
    "output": "Query parameter bound safely",
    "note": "Database-specific behavior and schema determine the result; use least-privilege credentials."
  },
  {
    "title": "Unit testing",
    "category": "Testing",
    "tag": "Verify small units",
    "definition": "Unit tests check a small unit of code in isolation using a test framework such as JUnit.",
    "syntax": "assertEquals(expected, actual);",
    "example": "// JUnit example:\n// assertEquals(5, Calculator.add(2, 3));",
    "output": "Passes when expected equals actual",
    "note": "Keep tests repeatable and independent; assertions depend on the selected testing library."
  },
  {
    "title": "Maven and Gradle",
    "category": "Build tools",
    "tag": "Build and dependencies",
    "definition": "Maven and Gradle automate compilation, dependency management, testing, packaging, and repeatable builds.",
    "syntax": "mvn test\n./gradlew test",
    "example": "// Run the build command from the project directory.",
    "output": "Runs configured tests",
    "note": "Commit build configuration and avoid checking secrets into source control."
  },
  {
    "title": "Modules",
    "category": "Java platform",
    "tag": "Explicit dependencies",
    "definition": "The Java Platform Module System groups packages into modules and can declare dependencies and exported packages.",
    "syntax": "module com.example.app {\n    requires java.sql;\n    exports com.example.api;\n}",
    "example": "// Place module-info.java in the module source root.",
    "output": "Declares module dependencies",
    "note": "Modules became a standard Java feature in Java 9."
  },
  {
    "title": "Sealed classes",
    "category": "OOP",
    "tag": "Restrict permitted subclasses",
    "definition": "A sealed class or interface declares which types may extend or implement it.",
    "syntax": "sealed interface Shape permits Circle, Square { }",
    "example": "sealed interface Shape permits Circle, Square { }\nfinal class Circle implements Shape { }\nfinal class Square implements Shape { }",
    "output": "Only permitted types can implement Shape",
    "note": "Permitted subclasses must follow the sealed/non-sealed/final rules; standardized in Java 17."
  },
  {
    "title": "Pattern matching instanceof",
    "category": "Modern Java",
    "tag": "Test and bind type",
    "definition": "Pattern matching for instanceof combines a type check with a variable binding.",
    "syntax": "if (obj instanceof String text) { ... }",
    "example": "Object obj = \"Java\";\nif (obj instanceof String text) System.out.println(text.length());",
    "output": "4",
    "note": "This syntax is standard in modern Java (Java 16)."
  },
  {
    "title": "Switch expressions",
    "category": "Modern Java",
    "tag": "Return a value from switch",
    "definition": "A switch expression produces a value and can use arrow rules.",
    "syntax": "String result = switch (code) { ... };",
    "example": "int code = 200;\nString result = switch (code) {\n    case 200 -> \"OK\";\n    case 404 -> \"Not found\";\n    default -> \"Other\";\n};\nSystem.out.println(result);",
    "output": "OK",
    "note": "Switch expressions became standard in Java 14."
  },
  {
    "title": "Text blocks",
    "category": "Modern Java",
    "tag": "Multiline string literal",
    "definition": "Text blocks make multiline string literals easier to read.",
    "syntax": "String json = \"\"\"\n    {\"ok\": true}\n    \"\"\";",
    "example": "String message = \"\"\"\n    Hello\n    Java\n    \"\"\";\nSystem.out.println(message.strip());",
    "output": "Hello\nJava",
    "note": "Text blocks became standard in Java 15."
  },
  {
    "title": "Virtual threads",
    "category": "Modern Java",
    "tag": "Lightweight threads",
    "definition": "Virtual threads are lightweight threads managed by the runtime, useful for many tasks that spend time waiting on I/O.",
    "syntax": "Thread.startVirtualThread(() -> work());",
    "example": "Thread.startVirtualThread(() -> System.out.println(\"Virtual thread\"));",
    "output": "Virtual thread",
    "note": "Standard in Java 21. They do not make CPU-bound work inherently faster."
  },
  {
    "title": "Sealed, records, and pattern matching overview",
    "category": "Modern Java",
    "tag": "Modern modeling tools",
    "definition": "Modern Java adds concise data carriers, restricted hierarchies, and expressive type matching.",
    "syntax": "record Point(int x, int y) { }",
    "example": "record Point(int x, int y) { }\nSystem.out.println(new Point(1, 2));",
    "output": "Point[x=1, y=2]",
    "note": "Check the Java version for feature availability when compiling examples."
  },
  {
    "title": "BigDecimal",
    "category": "Math & numbers",
    "tag": "Precise decimal arithmetic",
    "definition": "BigDecimal represents decimal numbers with arbitrary precision and is commonly used for financial calculations.",
    "syntax": "new BigDecimal(\"19.99\")",
    "example": "BigDecimal a = new BigDecimal(\"0.10\");\nBigDecimal b = new BigDecimal(\"0.20\");\nSystem.out.println(a.add(b));",
    "output": "0.30",
    "note": "Construct from decimal strings rather than double literals to avoid importing binary floating-point approximation."
  },
  {
    "title": "Math.ceil and Math.floor",
    "category": "Math",
    "tag": "Round toward a direction",
    "definition": "Math.ceil returns the smallest integer-valued double not less than the input; Math.floor returns the largest integer-valued double not greater than it.",
    "syntax": "Math.ceil(x)\nMath.floor(x)",
    "example": "System.out.println(Math.ceil(3.2));\nSystem.out.println(Math.floor(3.8));",
    "output": "4.0\n3.0",
    "note": "Both methods return double values."
  },
  {
    "title": "Math.pow and integer casts",
    "category": "Math",
    "tag": "Power result types",
    "definition": "Math.pow returns a double even when both inputs look like integers. Casting can convert it to an integer when appropriate.",
    "syntax": "int square = (int) Math.pow(5, 2);",
    "example": "int square = (int) Math.pow(5, 2);\nSystem.out.println(square);",
    "output": "25",
    "note": "For exact integer powers, multiplication may be simpler; casting can truncate non-integer results."
  },
  {
    "title": "Math.PI and Math.E",
    "category": "Math",
    "tag": "Mathematical constants",
    "definition": "Math.PI approximates π and Math.E approximates Euler’s number e.",
    "syntax": "Math.PI\nMath.E",
    "example": "System.out.println(Math.PI);\nSystem.out.println(Math.E);",
    "output": "3.141592653589793\n2.718281828459045",
    "note": "These are double constants supplied by java.lang.Math."
  },
  {
    "title": "Math.sin, cos, tan",
    "category": "Math",
    "tag": "Trigonometry",
    "definition": "These methods calculate trigonometric functions using angles measured in radians.",
    "syntax": "Math.sin(radians)\nMath.cos(radians)\nMath.tan(radians)",
    "example": "System.out.println(Math.sin(Math.PI / 2));",
    "output": "1.0",
    "note": "Convert degrees to radians with Math.toRadians(degrees)."
  },
  {
    "title": "Math.log and exp",
    "category": "Math",
    "tag": "Logarithms and exponentials",
    "definition": "Math.log calculates the natural logarithm, while Math.exp calculates e raised to a power.",
    "syntax": "Math.log(x)\nMath.exp(x)",
    "example": "System.out.println(Math.log(Math.E));",
    "output": "1.0",
    "note": "For base-10 logarithm use Math.log10(x)."
  },
  {
    "title": "Math.toRadians and toDegrees",
    "category": "Math",
    "tag": "Angle conversion",
    "definition": "These methods convert between degrees and radians.",
    "syntax": "Math.toRadians(degrees)\nMath.toDegrees(radians)",
    "example": "System.out.println(Math.toRadians(180));\nSystem.out.println(Math.toDegrees(Math.PI));",
    "output": "3.141592653589793\n180.0",
    "note": "Trigonometric Math methods expect radians."
  },
  {
    "title": "Math.signum and copySign",
    "category": "Math",
    "tag": "Sign of values",
    "definition": "signum returns the sign of a numeric value; copySign combines a magnitude with the sign of another value.",
    "syntax": "Math.signum(x)\nMath.copySign(magnitude, sign)",
    "example": "System.out.println(Math.signum(-9.0));",
    "output": "-1.0",
    "note": "Useful for numeric algorithms; review NaN and signed-zero behavior in precision-sensitive code."
  },
  {
    "title": "Math.floorDiv and floorMod",
    "category": "Math",
    "tag": "Integer division helpers",
    "definition": "floorDiv and floorMod provide division and remainder behavior based on mathematical floor, which differs from truncation for negative values.",
    "syntax": "Math.floorDiv(a, b)\nMath.floorMod(a, b)",
    "example": "System.out.println(Math.floorDiv(-7, 3));\nSystem.out.println(Math.floorMod(-7, 3));",
    "output": "-3\n2",
    "note": "Useful when consistent modulo behavior with negative operands matters."
  },
  {
    "title": "Math.hypot",
    "category": "Math",
    "tag": "Hypotenuse distance",
    "definition": "Math.hypot(x, y) calculates sqrt(x*x + y*y) with improved overflow and underflow handling.",
    "syntax": "Math.hypot(x, y)",
    "example": "System.out.println(Math.hypot(3, 4));",
    "output": "5.0",
    "note": "Useful for two-dimensional distance calculations."
  },
  {
    "title": "Math.cbrt",
    "category": "Math",
    "tag": "Cube root",
    "definition": "Math.cbrt returns the cube root of a double value.",
    "syntax": "Math.cbrt(number)",
    "example": "System.out.println(Math.cbrt(27));",
    "output": "3.0",
    "note": "Unlike sqrt, cube roots can be negative for negative inputs."
  },
  {
    "title": "Math.nextUp and nextDown",
    "category": "Math",
    "tag": "Adjacent floating-point values",
    "definition": "These methods return the adjacent representable floating-point value in the positive or negative direction.",
    "syntax": "Math.nextUp(x)\nMath.nextDown(x)",
    "example": "System.out.println(Math.nextUp(1.0) > 1.0);",
    "output": "true",
    "note": "These are advanced floating-point utilities, not ordinary rounding functions."
  },
  {
    "title": "BigInteger",
    "category": "Math & numbers",
    "tag": "Very large integers",
    "definition": "BigInteger supports integer arithmetic beyond the fixed ranges of byte, short, int, and long.",
    "syntax": "BigInteger.valueOf(123).multiply(...);",
    "example": "BigInteger a = new BigInteger(\"12345678901234567890\");\nSystem.out.println(a.add(BigInteger.ONE));",
    "output": "12345678901234567891",
    "note": "Import java.math.BigInteger; operations return new immutable values."
  },
  {
    "title": "Assertions",
    "category": "Testing",
    "tag": "Check assumptions",
    "definition": "assert statements check assumptions during development when assertions are enabled.",
    "syntax": "assert condition : message;",
    "example": "int value = 4;\nassert value > 0 : \"value must be positive\";",
    "output": "No output if assertion passes",
    "note": "Assertions are commonly disabled by default; do not use them to validate user input."
  },
  {
    "title": "Debugging",
    "category": "Development tools",
    "tag": "Find program errors",
    "definition": "Debugging uses breakpoints, stepping, variable inspection, and call stacks to understand runtime behavior.",
    "syntax": "Set breakpoint → step → inspect values",
    "example": "// Use VS Code Java debugger to pause at a line.",
    "output": "Inspect state during execution",
    "note": "A reproducible small example helps diagnose bugs."
  },
  {
    "title": "Common compile-time errors",
    "category": "Troubleshooting",
    "tag": "Fix syntax/type problems",
    "definition": "Compile-time errors include missing semicolons, mismatched braces, undeclared variables, incompatible types, and invalid method calls.",
    "syntax": "javac Main.java",
    "example": "// Read the first compiler error and its line/column, then recompile.",
    "output": "Compiler points to a problem",
    "note": "One early syntax error can cause many later messages; fix errors from the top down."
  },
  {
    "title": "Common runtime exceptions",
    "category": "Troubleshooting",
    "tag": "Understand failures",
    "definition": "Common runtime exceptions include NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException, and ArithmeticException.",
    "syntax": "try { /* risky operation */ } catch (SpecificException e) { ... }",
    "example": "int[] a = {1};\n// a[2] would throw ArrayIndexOutOfBoundsException",
    "output": "Use valid indexes",
    "note": "Read the stack trace to locate where the exception originated."
  },
  {
    "title": "Null and NullPointerException",
    "category": "Troubleshooting",
    "tag": "Missing object reference",
    "definition": "null means a reference points to no object. Calling an instance method or accessing a field through null can throw NullPointerException.",
    "syntax": "if (value != null) { ... }",
    "example": "String name = null;\nSystem.out.println(name == null);",
    "output": "true",
    "note": "Avoid unnecessary nulls and validate external data at boundaries."
  },
  {
    "title": "equalsIgnoreCase",
    "category": "Strings",
    "tag": "Case-insensitive comparison",
    "definition": "equalsIgnoreCase compares strings without considering letter case for typical text.",
    "syntax": "a.equalsIgnoreCase(b)",
    "example": "System.out.println(\"JAVA\".equalsIgnoreCase(\"java\"));",
    "output": "true",
    "note": "Locale-sensitive linguistic comparison may require a Collator or deliberate normalization."
  },
  {
    "title": "StringBuilder reverse",
    "category": "Strings",
    "tag": "Reverse characters",
    "definition": "StringBuilder.reverse reverses the sequence of UTF-16 code units with special handling for surrogate pairs.",
    "syntax": "new StringBuilder(text).reverse().toString()",
    "example": "System.out.println(new StringBuilder(\"Java\").reverse());",
    "output": "avaJ",
    "note": "Complex grapheme clusters may need more sophisticated Unicode handling."
  },
  {
    "title": "System properties",
    "category": "Java platform",
    "tag": "Read runtime settings",
    "definition": "System.getProperty reads a named JVM system property, such as the Java version or operating system name.",
    "syntax": "System.getProperty(\"java.version\")",
    "example": "System.out.println(System.getProperty(\"os.name\"));",
    "output": "Depends on operating system",
    "note": "Do not assume a property has the same value on every machine."
  },
  {
    "title": "Environment variables",
    "category": "Java platform",
    "tag": "Read process configuration",
    "definition": "System.getenv reads environment variables supplied to the process by its environment.",
    "syntax": "System.getenv(\"APP_MODE\")",
    "example": "String mode = System.getenv(\"APP_MODE\");\nSystem.out.println(mode == null ? \"not set\" : mode);",
    "output": "Value or not set",
    "note": "Do not hardcode secrets in source code or print sensitive environment values to logs."
  },
  {
    "title": "Locale",
    "category": "Internationalization",
    "tag": "Language and region conventions",
    "definition": "Locale represents language and regional preferences that affect formatting, messages, and sorting.",
    "syntax": "Locale.US\nLocale.forLanguageTag(\"en-PH\")",
    "example": "System.out.println(Locale.forLanguageTag(\"en-PH\").toLanguageTag());",
    "output": "en-PH",
    "note": "Use explicit locales for predictable machine-readable output."
  },
  {
    "title": "ResourceBundle",
    "category": "Internationalization",
    "tag": "Localized messages",
    "definition": "ResourceBundle loads locale-specific resources such as translated message strings.",
    "syntax": "ResourceBundle.getBundle(\"Messages\", locale)",
    "example": "// ResourceBundle bundle = ResourceBundle.getBundle(\"Messages\", Locale.US);",
    "output": "Loads configured localized resource",
    "note": "Resource files and keys must exist for the requested bundle/locale."
  },
  {
    "title": "Security best practices",
    "category": "Secure Java",
    "tag": "Protect applications",
    "definition": "Secure Java applications by validating input, using parameterized SQL, storing password hashes, protecting secrets, and keeping dependencies updated.",
    "syntax": "Validate input; hash passwords; parameterize SQL",
    "example": "// Never store plaintext passwords or commit production secrets.",
    "output": "Defense in depth",
    "note": "Security depends on the whole application, deployment, and threat model."
  },
  {
    "title": "Dependency management",
    "category": "Build tools",
    "tag": "Reuse libraries safely",
    "definition": "Build tools download and manage third-party libraries and their versions.",
    "syntax": "pom.xml or build.gradle",
    "example": "// Declare a maintained library version in your build configuration.",
    "output": "Repeatable dependencies",
    "note": "Review licenses, updates, vulnerabilities, and dependency provenance."
  },
  {
    "title": "Java coding conventions",
    "category": "Best practices",
    "tag": "Readable consistent code",
    "definition": "Conventions commonly use PascalCase for class names, camelCase for methods/variables, and uppercase underscores for constants.",
    "syntax": "class StudentRecord { int totalScore; }",
    "example": "final int MAX_RETRIES = 3;",
    "output": "Clear names",
    "note": "Follow the style guide used by your team or course."
  },
  {
    "title": "Algorithm complexity",
    "category": "Computer science",
    "tag": "Estimate efficiency",
    "definition": "Big O notation describes how an algorithm’s time or space use scales as input grows.",
    "syntax": "O(1), O(log n), O(n), O(n log n), O(n²)",
    "example": "// A single loop over n items is typically O(n).",
    "output": "Growth rate depends on input size",
    "note": "Big O is an abstraction; actual performance also depends on constants, hardware, and data."
  },
  {
    "title": "Binary search",
    "category": "Algorithms",
    "tag": "Search sorted data",
    "definition": "Binary search repeatedly halves a sorted search range, taking O(log n) time.",
    "syntax": "Arrays.binarySearch(sortedArray, key)",
    "example": "int[] a = {1, 3, 5, 7};\nSystem.out.println(Arrays.binarySearch(a, 5));",
    "output": "2",
    "note": "The array must be sorted first; the returned index is zero-based."
  },
  {
    "title": "Sorting",
    "category": "Algorithms",
    "tag": "Order data",
    "definition": "Sorting arranges elements according to a comparator or natural ordering.",
    "syntax": "list.sort(Comparator.naturalOrder());",
    "example": "List<Integer> nums = new ArrayList<>(List.of(4, 1, 3));\nnums.sort(Comparator.naturalOrder());\nSystem.out.println(nums);",
    "output": "[1, 3, 4]",
    "note": "Choose ordering and stability requirements appropriate to the problem."
  },
  {
    "title": "Stack data structure",
    "category": "Data structures",
    "tag": "Last in, first out",
    "definition": "A stack removes the most recently added element first. Deque is generally preferred to the legacy Stack class.",
    "syntax": "Deque<Integer> stack = new ArrayDeque<>();",
    "example": "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(10); stack.push(20);\nSystem.out.println(stack.pop());",
    "output": "20",
    "note": "Operations include push, pop, and peek."
  },
  {
    "title": "Big-O of common collections",
    "category": "Data structures",
    "tag": "Performance overview",
    "definition": "ArrayList provides fast indexed access; HashMap and HashSet commonly provide expected constant-time lookup; TreeMap and TreeSet provide logarithmic operations.",
    "syntax": "List / Set / Map implementations",
    "example": "// Choose a collection based on order, lookup, and update needs.",
    "output": "Complexities are typical, not absolute guarantees",
    "note": "Performance depends on implementation, hashing, data size, and usage patterns."
  },
  {
    "title": "Dependency injection concept",
    "category": "Application design",
    "tag": "Supply dependencies from outside",
    "definition": "Dependency injection provides an object’s collaborators from outside instead of constructing all dependencies internally.",
    "syntax": "Service(Repository repository)",
    "example": "class Service {\n    private final Repository repo;\n    Service(Repository repo) { this.repo = repo; }\n}",
    "output": "Service receives its repository",
    "note": "It improves testability and makes dependencies explicit."
  },
  {
    "title": "MVC architecture",
    "category": "Application design",
    "tag": "Separate application concerns",
    "definition": "Model-View-Controller separates data/domain logic, presentation, and request/control flow.",
    "syntax": "Model ↔ Controller ↔ View",
    "example": "// A web app may use a controller to coordinate a model and render a view.",
    "output": "Separation of responsibilities",
    "note": "MVC details vary by framework and application design."
  },
  {
    "title": "REST API concept",
    "category": "Web development",
    "tag": "HTTP resource interface",
    "definition": "A REST-style API exposes resources through HTTP methods and representations, often JSON.",
    "syntax": "GET /api/items\nPOST /api/items",
    "example": "// GET reads; POST creates; PUT/PATCH update; DELETE removes.",
    "output": "HTTP response depends on server",
    "note": "Use authentication, authorization, validation, and appropriate status codes."
  },
  {
    "title": "JSON processing",
    "category": "Web development",
    "tag": "Exchange structured data",
    "definition": "JSON represents data using objects, arrays, strings, numbers, booleans, and null. Java applications use libraries to parse and write JSON.",
    "syntax": "ObjectMapper or JSON library API",
    "example": "// Use a maintained JSON library to serialize/deserialize data.",
    "output": "Depends on JSON input",
    "note": "Validate untrusted JSON and avoid assuming fields are present or correctly typed."
  },
  {
    "title": "Logging",
    "category": "Development tools",
    "tag": "Record application events",
    "definition": "Logging records diagnostics and operational events at levels such as debug, info, warn, and error.",
    "syntax": "logger.info(\"Started\");",
    "example": "// Use a logging framework rather than printing sensitive details to stdout.",
    "output": "Application event recorded",
    "note": "Never log passwords, session tokens, or other secrets."
  },
  {
    "title": "Assertions vs exceptions",
    "category": "Best practices",
    "tag": "Different purposes",
    "definition": "Assertions check internal assumptions during development; exceptions communicate error conditions that callers may need to handle.",
    "syntax": "assert internalInvariant;\nthrow new IllegalArgumentException(...);",
    "example": "if (age < 0) throw new IllegalArgumentException(\"age must be nonnegative\");",
    "output": "Rejects invalid argument",
    "note": "Use exceptions for invalid external input and expected error paths."
  },
  {
    "title": "API documentation with Javadoc",
    "category": "Development tools",
    "tag": "Document public APIs",
    "definition": "Javadoc comments document classes, methods, parameters, return values, and thrown exceptions.",
    "syntax": "/** @param name ... @return ... */",
    "example": "/** Returns a greeting for the given name.\n * @param name the person\n * @return greeting text\n */\nString greet(String name) { return \"Hi \" + name; }",
    "output": "Documented method",
    "note": "Generate HTML docs with the javadoc tool."
  },
  {
    "title": "Java release compatibility",
    "category": "Java platform",
    "tag": "Choose language/runtime version",
    "definition": "Java language syntax and library APIs vary by release. Compile with an intended target and test on the deployment runtime.",
    "syntax": "java -version\njavac -version",
    "example": "// Check installed versions before compiling modern syntax.",
    "output": "Shows installed version",
    "note": "Virtual threads require Java 21; records are standard from Java 16; text blocks from Java 15."
  },
  {
    "title": "Main method variants",
    "category": "Java basics",
    "tag": "Application entry point details",
    "definition": "The traditional launch entry point is public static void main(String[] args). Modern Java launch options and source-file execution have evolved across releases.",
    "syntax": "public static void main(String[] args)",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(args.length);\n    }\n}",
    "output": "Number of command-line arguments",
    "note": "The traditional form is the most portable for beginner assignments."
  },
  {
    "title": "Command-line arguments",
    "category": "Java basics",
    "tag": "Input when launching",
    "definition": "Command-line arguments are strings passed to main when the program starts.",
    "syntax": "args[0]",
    "example": "public class Main {\n    public static void main(String[] args) {\n        if (args.length > 0) System.out.println(args[0]);\n    }\n}",
    "output": "Prints first argument if provided",
    "note": "Check args.length before indexing to avoid ArrayIndexOutOfBoundsException."
  },
  {
    "title": "EnumSet and EnumMap",
    "category": "Collections",
    "tag": "Collections optimized for enums",
    "definition": "EnumSet and EnumMap are specialized collection implementations designed for enum keys/elements.",
    "syntax": "EnumSet<Day> days = EnumSet.of(Day.MON);",
    "example": "// EnumSet.of(Weekday.MONDAY, Weekday.FRIDAY) is a compact enum set example.",
    "output": "Set of enum constants",
    "note": "Use when the domain is an enum type."
  },
  {
    "title": "PriorityQueue",
    "category": "Collections",
    "tag": "Priority-based processing",
    "definition": "PriorityQueue retrieves elements according to natural ordering or a comparator rather than insertion order.",
    "syntax": "PriorityQueue<Integer> q = new PriorityQueue<>();",
    "example": "PriorityQueue<Integer> q = new PriorityQueue<>();\nq.add(9); q.add(2);\nSystem.out.println(q.poll());",
    "output": "2",
    "note": "Iteration is not guaranteed to be sorted; repeatedly poll to retrieve priority order."
  },
  {
    "title": "CopyOnWriteArrayList",
    "category": "Concurrency",
    "tag": "Read-heavy concurrent list",
    "definition": "CopyOnWriteArrayList creates a new underlying array for mutative operations and is useful for some read-heavy concurrent workloads.",
    "syntax": "new CopyOnWriteArrayList<Type>()",
    "example": "// Use when iteration is frequent and writes are rare.",
    "output": "Thread-safe snapshot-style iteration",
    "note": "Writes can be expensive; choose based on workload and contention."
  },
  {
    "title": "AtomicInteger",
    "category": "Concurrency",
    "tag": "Atomic numeric update",
    "definition": "AtomicInteger supports atomic updates to an integer across threads without using a synchronized block for each operation.",
    "syntax": "AtomicInteger count = new AtomicInteger();",
    "example": "AtomicInteger count = new AtomicInteger();\ncount.incrementAndGet();\nSystem.out.println(count.get());",
    "output": "1",
    "note": "Atomic operations are useful for counters; more complex invariants may require locks."
  },
  {
    "title": "Deadlock",
    "category": "Concurrency",
    "tag": "Threads wait on each other",
    "definition": "Deadlock occurs when threads wait indefinitely for locks held by one another.",
    "syntax": "Acquire locks in a consistent order",
    "example": "// Avoid nested lock acquisition in inconsistent orders.",
    "output": "Program may stop making progress",
    "note": "Use lock ordering, timeouts, and careful concurrency design."
  },
  {
    "title": "Race condition",
    "category": "Concurrency",
    "tag": "Timing-dependent bug",
    "definition": "A race condition occurs when correctness depends on the unpredictable timing or interleaving of concurrent operations.",
    "syntax": "Protect shared mutable state",
    "example": "// Two unsynchronized increments may lose an update.",
    "output": "Result can be inconsistent",
    "note": "Use synchronization, atomic types, immutability, or confinement to prevent races."
  },
  {
    "title": "Immutability",
    "category": "Best practices",
    "tag": "Object state never changes",
    "definition": "An immutable object cannot change its observable state after construction.",
    "syntax": "private final fields; no mutators",
    "example": "// String and many java.time classes are immutable.",
    "output": "State remains stable",
    "note": "Immutability simplifies reasoning and can improve thread safety."
  },
  {
    "title": "Builder pattern",
    "category": "Design patterns",
    "tag": "Construct complex objects",
    "definition": "The Builder pattern separates construction from the final object, especially when many optional values exist.",
    "syntax": "new User.Builder().name(\"Ana\").build()",
    "example": "// A builder offers chained configuration before build().",
    "output": "Configured object",
    "note": "Useful for readability; do not introduce a builder for every simple class."
  },
  {
    "title": "Factory pattern",
    "category": "Design patterns",
    "tag": "Centralize object creation",
    "definition": "A factory method or class encapsulates the decision about which concrete object to create.",
    "syntax": "Shape shape = ShapeFactory.create(\"circle\");",
    "example": "// A factory may return an interface based on a configuration value.",
    "output": "Concrete object selected",
    "note": "Factories can reduce coupling to implementation classes."
  },
  {
    "title": "Singleton pattern",
    "category": "Design patterns",
    "tag": "One shared instance",
    "definition": "Singleton restricts a class to a single intended instance, but global state can complicate tests and concurrency.",
    "syntax": "enum AppConfig { INSTANCE }",
    "example": "enum AppConfig { INSTANCE }",
    "output": "One enum constant instance",
    "note": "Prefer dependency injection when a globally shared instance is not truly needed."
  },
  {
    "title": "Strategy pattern",
    "category": "Design patterns",
    "tag": "Swap algorithms",
    "definition": "Strategy encapsulates interchangeable algorithms behind a common interface.",
    "syntax": "interface PaymentStrategy { void pay(); }",
    "example": "// Different strategies can implement card, cash, or wallet payment.",
    "output": "Algorithm chosen at runtime",
    "note": "Useful when behavior varies independently of the caller."
  },
  {
    "title": "Observer pattern",
    "category": "Design patterns",
    "tag": "Notify subscribers",
    "definition": "Observer lets interested objects receive notifications when a subject changes.",
    "syntax": "listener.onChange(event);",
    "example": "// UI events and event-driven systems commonly use observer-like designs.",
    "output": "Subscribers notified",
    "note": "Define lifecycle and unsubscribe behavior to avoid leaks."
  },
  {
    "title": "SOLID principles",
    "category": "Software design",
    "tag": "Design guidelines",
    "definition": "SOLID summarizes five object-oriented design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
    "syntax": "One responsibility; depend on abstractions",
    "example": "// Keep classes focused and depend on interfaces where useful.",
    "output": "Maintainable design goal",
    "note": "These are guidelines to apply with judgment, not rigid laws."
  }
];

// Core concepts
const javaConcepts = [
 {title:"Math.pow(base, exponent)",category:"Math",tag:"Power",definition:"Raises a number to a power. The first argument is the base and the second is the exponent. It returns a double.",syntax:"Math.pow(base, exponent)",example:"double result = Math.pow(2, 3);\nSystem.out.println(result);",output:"8.0",note:"2³ means 2 × 2 × 2. Use 2.0 as the base if you want to make the floating-point result obvious."},
 {title:"Math.sqrt(number)",category:"Math",tag:"Square root",definition:"Returns the positive square root of a number as a double. A negative argument produces NaN.",syntax:"Math.sqrt(number)",example:"double result = Math.sqrt(25);\nSystem.out.println(result);",output:"5.0",note:"The square root of 25 is 5 because 5 × 5 = 25."},
 {title:"Math.max(a, b)",category:"Math",tag:"Larger value",definition:"Returns the greater of two values.",syntax:"Math.max(a, b)",example:"int highest = Math.max(14, 9);\nSystem.out.println(highest);",output:"14",note:"There are overloads for several numeric types."},
 {title:"Math.min(a, b)",category:"Math",tag:"Smaller value",definition:"Returns the smaller of two values.",syntax:"Math.min(a, b)",example:"int lowest = Math.min(14, 9);\nSystem.out.println(lowest);",output:"9",note:"Useful when keeping a value within a limit."},
 {title:"Math.abs(number)",category:"Math",tag:"Absolute value",definition:"Returns the absolute value: the distance from zero, without a negative sign for ordinary numeric values.",syntax:"Math.abs(number)",example:"int distance = Math.abs(-12);\nSystem.out.println(distance);",output:"12",note:"For example, abs(-12) is 12 and abs(12) is also 12."},
 {title:"Math.round(number)",category:"Math",tag:"Round",definition:"Rounds a floating-point value to the nearest whole-number value, returning an int for float input or a long for double input.",syntax:"Math.round(number)",example:"long rounded = Math.round(4.7);\nSystem.out.println(rounded);",output:"5",note:"For formatting a fixed number of decimal places, use formatting such as System.out.printf(\"%.2f\", value)."},
 {title:"Math.random()",category:"Math",tag:"Random number",definition:"Returns a pseudo-random double greater than or equal to 0.0 and less than 1.0.",syntax:"Math.random()",example:"int dice = (int)(Math.random() * 6) + 1;\nSystem.out.println(dice);",output:"A whole number from 1 to 6",note:"The result changes between runs. For more advanced random-number needs, Java also provides the Random class."},
 {title:"Variables",category:"Basics",tag:"Store a value",definition:"A named place in a program that holds a value of a particular type.",syntax:"type variableName = value;",example:"int age = 18;\nString name = \"Alex\";\nSystem.out.println(name + \" is \" + age);",output:"Alex is 18",note:"Choose descriptive names and use the type that matches the data."},
 {title:"Primitive data types",category:"Basics",tag:"Data types",definition:"Java's eight primitive types are byte, short, int, long, float, double, char, and boolean.",syntax:"int count = 10;\ndouble price = 19.99;\nchar grade = 'A';\nboolean passed = true;",example:"System.out.println(count);\nSystem.out.println(price);\nSystem.out.println(grade);\nSystem.out.println(passed);",output:"10\n19.99\nA\ntrue",note:"String is a class, not a primitive type."},
 {title:"Operators",category:"Basics",tag:"Calculations",definition:"Operators perform calculations, comparisons, and logical operations.",syntax:"+  -  *  /  %\n==  !=  >  <  >=  <=\n&&  ||  !",example:"int remainder = 10 % 3;\nboolean isAdult = 18 >= 18;\nSystem.out.println(remainder);\nSystem.out.println(isAdult);",output:"1\ntrue",note:"When dividing integers, Java discards the fractional part: 5 / 2 equals 2. Use 5.0 / 2 for 2.5."},
 {title:"if / else",category:"Control flow",tag:"Make a decision",definition:"Runs different blocks of code depending on whether a condition is true or false.",syntax:"if (condition) { ... } else { ... }",example:"int score = 85;\nif (score >= 75) {\n    System.out.println(\"Passed\");\n} else {\n    System.out.println(\"Try again\");\n}",output:"Passed",note:"The condition must evaluate to a boolean value."},
 {title:"for loop",category:"Control flow",tag:"Repeat code",definition:"Repeats a block of code while a loop condition remains true. A for loop commonly uses initialization, condition, and update.",syntax:"for (initialization; condition; update) { ... }",example:"for (int i = 1; i <= 3; i++) {\n    System.out.println(i);\n}",output:"1\n2\n3",note:"Be careful to update the loop variable so the loop can eventually stop."},
 {title:"while loop",category:"Control flow",tag:"Repeat while true",definition:"Checks a condition before each repetition. The body may run zero times if the condition starts false.",syntax:"while (condition) { ... }",example:"int n = 1;\nwhile (n <= 3) {\n    System.out.println(n);\n    n++;\n}",output:"1\n2\n3",note:"n++ increases n by one."},
 {title:"Methods",category:"Basics",tag:"Reusable code",definition:"A named block of code that can be called when needed. A method may accept parameters and return a value.",syntax:"static returnType methodName(parameters) { ... }",example:"static int add(int a, int b) {\n    return a + b;\n}\n// Call it inside main:\nSystem.out.println(add(2, 3));",output:"5",note:"Use void when a method does not return a value."},
 {title:"Class and object",category:"OOP",tag:"OOP foundation",definition:"A class defines the data and behavior objects can have. An object is an instance created from a class.",syntax:"class Dog { String name; }\nDog pet = new Dog();",example:"class Dog {\n    String name = \"Milo\";\n}\nDog pet = new Dog();\nSystem.out.println(pet.name);",output:"Milo",note:"Classes help organize related data and behavior."},
 {title:"Constructor",category:"OOP",tag:"Initialize objects",definition:"A special class member used when creating an object. It has the same name as the class and has no return type.",syntax:"ClassName(parameters) { ... }",example:"class Student {\n    String name;\n    Student(String n) { name = n; }\n}\nStudent s = new Student(\"Kai\");\nSystem.out.println(s.name);",output:"Kai",note:"A constructor can set an object's initial state."},
 {title:"Inheritance",category:"OOP",tag:"Reuse class behavior",definition:"Allows a class to extend another class and inherit accessible members. Java classes use the extends keyword.",syntax:"class Child extends Parent { ... }",example:"class Animal { void speak() { System.out.println(\"Sound\"); } }\nclass Cat extends Animal { }\nnew Cat().speak();",output:"Sound",note:"Java supports single inheritance for classes; a class can implement multiple interfaces."},
 {title:"Arrays",category:"Collections",tag:"Fixed-size sequence",definition:"An array stores a fixed number of values of the same type. Array indexes start at zero.",syntax:"int[] numbers = {10, 20, 30};",example:"int[] numbers = {10, 20, 30};\nSystem.out.println(numbers[0]);\nSystem.out.println(numbers.length);",output:"10\n3",note:"The first element is index 0, and the last is length - 1."},
 {title:"ArrayList",category:"Collections",tag:"Resizable list",definition:"ArrayList is a resizable list from java.util. Import java.util.ArrayList before using it.",syntax:"ArrayList<Type> list = new ArrayList<>();",example:"import java.util.ArrayList;\nArrayList<String> names = new ArrayList<>();\nnames.add(\"Ana\");\nSystem.out.println(names.get(0));",output:"Ana",note:"Use add() to add items and get(index) to read an item."},
 {title:"Scanner",category:"Input & strings",tag:"Read user input",definition:"Scanner reads input from sources such as the keyboard. Import java.util.Scanner to use it.",syntax:"Scanner input = new Scanner(System.in);",example:"import java.util.Scanner;\nScanner input = new Scanner(System.in);\nSystem.out.print(\"Name: \");\nString name = input.nextLine();\nSystem.out.println(\"Hello, \" + name);\ninput.close();",output:"Prompts for a name, then greets the user",note:"nextInt() reads an integer; nextLine() reads a whole line of text. Mixing them may require consuming the leftover newline."},
 {title:"String methods",category:"Input & strings",tag:"Work with text",definition:"String methods inspect or transform text. Strings are immutable, so methods return results rather than changing the original string.",syntax:"text.length()\ntext.toUpperCase()\ntext.equals(other)",example:"String word = \"Java\";\nSystem.out.println(word.length());\nSystem.out.println(word.toUpperCase());\nSystem.out.println(word.equals(\"Java\"));",output:"4\nJAVA\ntrue",note:"Use equals() to compare String contents, not == in typical text comparisons."},
 {title:"return",category:"Basics",tag:"Send back a result",definition:"Ends a method and optionally sends a value back to the code that called it. The returned value must match the method's declared return type.",syntax:"return expression;",example:"static int square(int n) {\n    return n * n;\n}\nSystem.out.println(square(4));",output:"16",note:"A void method can use return; without a value to exit early."}
];
javaConcepts.push(...additionalJavaConcepts);
